import React, { useEffect, useState } from "react";
import {
	TitleText,
	TitleContainer,
	FloatingButton,
	Container,
	Loading,
	VooList,
	Sidebar,
	PageCount
} from "../../components";
import ConfirmarCompra from "./ConfirmarCompra";
import PesquisarVoos from "./PesquisarVoos";
import { State } from "./interfaces";
import { ListaVoo, Aeroporto } from "../../interfaces";
import { NavigationProps as Props } from "./../../routes/types";
import Utils from "../../Utils";
import Icon from 'react-native-vector-icons/MaterialIcons';
import api from "../../services";
import { Text, View } from "react-native";
import { TouchableWithoutFeedback as Button} from "react-native";
import { useFocusEffect } from "@react-navigation/native";


const initialState : State = {
	listaVoo: [],
	selectedVoo: {} as ListaVoo,
	page: 1,
	totalPages: 0,
	viewController:{
		modal: false,
		calendarioSaida: false,
		loading: true,
		modalConfirmar: false,
		calendarioVolta: false,
		exibePaginas: true
	},
	listaAeroportos: [],
}

export default function BuscarVoos({ navigation }: Props) {
	const [{
		listaVoo,
		selectedVoo,
		page,
		totalPages,
		viewController,
		listaAeroportos
	}, setState] = useState<State>(initialState);
	useFocusEffect(
		React.useCallback(() => {
			const clear = () => {
				setState({...initialState})
			}
			const promises = [
				api.get(`/voo/?&page=${initialState.page}`),
				Utils.getAeroportos(),
				api.get("/voo/count")
			]

			setState(prev => ({
				...prev,
				viewController:{
					...prev.viewController,
					loading:true
				},
				page: initialState.page
			}))
			Promise.all(promises).then(values => {
				const [voos,aeroportos,totalPages] = values
				setState(prev => ({
					...prev,
					listaVoo: voos.data || prev.listaVoo,
					listaAeroportos: aeroportos || prev.listaAeroportos,
					totalPages: totalPages.data,
					viewController: {
						...prev.viewController,
						loading:false
					}
				}))
			}).catch(err => {
				console.log(err)
				console.log("ERRO NAS PROMISES")
			})

		  	return () => clear()
		}, [])
	)
	useEffect(() => {
		const getVoos = () => {
			setState(prev => ({
				...prev,
				viewController:{
					...prev.viewController,
					loading:true
				}
			}))
			const vooData = api.get(`/voo/?&page=${page}`)
			vooData.then(response => {
				setState(prev => ({
					...prev,
					listaVoo: response.data,
					viewController:{
						...prev.viewController,
						loading:false
					}
				}))
			})
		}
		if(page !== initialState.page)
			getVoos();
	},[page])
	navigation.addListener("beforeRemove", e => {
		if(e.data.action.type === "GO_BACK")
			e.preventDefault()
		return true
	});
	return (
		<Container pointerEvents={viewController.loading ? "none" : "auto"}>
			<Sidebar
				navigation={navigation}
			/>

			<TitleContainer
				style={{
					flexDirection:"row",
					justifyContent: "space-between",
					alignItems: "center",
				}}
			>
				<Button
					onPress={() => setState(prev => ({...prev, page: prev.page - 1}))}
				>
					{(<Icon size={30} color={"white"} name="arrow-back-ios" />)}
				</Button>
				<TitleText>
						Buscar Voos
				</TitleText>
				<Button
					onPress={() => setState(prev => ({...prev, page: prev.page + 1}))}
				>
					{(<Icon size={30} color={"white"} name="arrow-forward-ios" />)}
				</Button>
			</TitleContainer>

			{viewController.loading && <Loading />}

			<FloatingButton
				onPress={() => {
					setState(prev => ({
						...prev,
						viewController: {
							...prev.viewController,
							modal: true
						}
					}))
				}}
			>
				{(<Icon size={30} color={"#004071"} name="search" />)}
			</FloatingButton>

			{
				ConfirmarCompra({
					viewController,
					selectedVoo,
					listaVoo,
					setState,
					navigation,
				})
			}

			{PesquisarVoos({
				listaAeroportos,
				viewController,
				setState
			})}

			{
				listaVoo.length ? (
					<View>
						{
							viewController.exibePaginas &&
							<PageCount
								page={page}
								totalPages={totalPages}
							/>
						}
						<VooList
							gridNumber={1}
							acao={true}
							onRefresh={() => {
								setState(prev => ({
									...prev,
									page: initialState.page
								}))
							}}
							listaVoo={listaVoo}
							onPress={function(voo : ListaVoo){
								setState(prev => ({
									...prev,
									viewController: {
										...prev.viewController,
										modalConfirmar: true
									},
									selectedVoo:voo
								}))
							}}
						/>
					</View>
				) : (false)
			}
		</Container>
	);
}