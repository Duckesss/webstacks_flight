import React, { useState, useEffect } from "react";
import { Text, TouchableOpacity } from "react-native";
import api from "../../services";
import styles from "./styles";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { NavigationProps } from "./../../routes/types";
import {Title, FloatingButton, Container, VooList, Loading, Sidebar } from "../../components";
import { ListaVoo } from "../../interfaces";
import Icon from 'react-native-vector-icons/MaterialIcons';
import {MyFlights, State} from "./interfaces"
import { useFocusEffect } from "@react-navigation/native";

const initialState : State = {
	listaVoo: {
		voosRepetidos: {},
		voos: []
	},
	loading: true,
	getListaVoo: true,
}
export default function MeusVoos({ navigation }: NavigationProps) {
	const [{listaVoo,getListaVoo,loading},setState] = useState<State>(initialState)
	navigation.addListener("beforeRemove", e => {
		if(e.data.action.type === "GO_BACK")
			e.preventDefault()
		return true
	});
	useFocusEffect(
		React.useCallback(() => {
			const clear = () => {
				setState({...initialState})
			}
			getVoos(setState).then(async resposta => {
				if(resposta?.response?.data?.auth === false){
					await AsyncStorage.setItem("@token","");
					navigation.navigate("Login")
				}
			});
		  	return () => clear()
		}, [getListaVoo])
	)
	return (
		<Container>
			<Sidebar
				navigation={navigation}
			/>
			<Title>Meus Voos</Title>
			{loading && <Loading />}
			{
				listaVoo.voos.length ? (
					<VooList
						gridNumber={1}
						onRefresh={() => {
							setState(prev => ({
								...prev,
								getListaVoo: !getListaVoo
							}))
						}}
						acao={false}
						repetidos={listaVoo.voosRepetidos}
						listaVoo={listaVoo.voos}
					/>
				) : (
					!loading && 
					<Container>
						<Text style={styles.defaultText}>
							Você ainda não comprou voos.
						</Text>
						<TouchableOpacity
							onPress={() => navigation.navigate("BuscarVoos")}
						>
							<Text style={styles.linkText}>
								Clique aqui ou no carrinho para comprar um!
							</Text>
						</TouchableOpacity>
					</Container>
				)
			}
			<FloatingButton
				onPress={() => {
					navigation.navigate("BuscarVoos")
				}}
			>
				{(<Icon size={30} color={"#004071"} name={"shopping-cart"}/>)}
			</FloatingButton>
		</Container>
	);
}

async function getVoos(setState: React.Dispatch<React.SetStateAction<State>>) {
	try{
		console.log("getvoos")
		const token = await AsyncStorage.getItem("@token");
		const response = await api.get("/my-flights", {
			headers: { Authorization: token },
		});
		const lista = response.data.myFlights.reduce((retorno : MyFlights,voo : ListaVoo) => {
			if(retorno.voosRepetidos[voo._id]){
				retorno.voosRepetidos[voo._id]++
			}else{
				retorno.voosRepetidos[voo._id] = 1
				retorno.voos.push(voo)
			}
			return retorno
		}, {
			voosRepetidos: {},
			voos: []
		})
		setState(prev => ({
			...prev,
			listaVoo: lista,
			loading:false
		}))
	}catch(err){
		return err
	}
}