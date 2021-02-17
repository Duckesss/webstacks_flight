import React, { useEffect, useState } from "react";
import {
	Title,
	FloatingButton,
	Container,
	Loading,
	VooList,
	Sidebar
} from "../../components";
import ConfirmarCompra from "./ConfirmarCompra";
import PesquisarVoos from "./PesquisarVoos";
import { ViewController } from "./interfaces";
import { ListaVoo, Aeroporto } from "../../interfaces";
import { NavigationProps as Props } from "./../../routes/types";
import Utils from "../../Utils";
import Icon from 'react-native-vector-icons/MaterialIcons';
import api from "../../services";

export default function BuscarVoos({ navigation }: Props) {
	const [listaVoo, setListaVoo] = useState<ListaVoo[]>([]);
	const [selectedVoo, setSelectedVoo] = useState<ListaVoo>({} as ListaVoo);
	const [viewController, setViewController] = useState<ViewController>({
		modal: false,
		calendarioSaida: false,
		loading: true,
		modalConfirmar: false,
		filter: false,
		calendarioVolta: false,
	});
	const [listaAeroportos, setListaAeroportos] = useState<Aeroporto[]>([]);
	const [buscaAeroportos, setBuscaAeroportos] = useState<boolean>(true);
	useEffect(() => {
		if(viewController.modal && buscaAeroportos === true){
			setViewController({ ...viewController, loading: true });
				Utils.getAeroportos().then(aeroportos => {
					setListaAeroportos(aeroportos);
					setBuscaAeroportos(false);
					setViewController({ ...viewController, loading: false });
				})
		}
		return () => {setBuscaAeroportos(true);}
	},[viewController.modal])
	useEffect(() => {
		api.get("/voo/?&page=1").then(response => {
			setListaVoo(response.data)
			setViewController({
				...viewController,
				loading:false
			})
		})
	},[])
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
			<Title>Buscar Voos</Title>
			{viewController.loading && <Loading />}
			<FloatingButton
				onPress={() => {
					setViewController({ ...viewController, modal: true });
				}}
			>
				{(<Icon size={30} color={"#004071"} name="search" />)}
			</FloatingButton>
			{
				ConfirmarCompra({
					viewController,
					setViewController,
					selectedVoo,
					listaVoo,
					setListaVoo,
				})
			}
			{PesquisarVoos({
				listaAeroportos,
				setListaVoo,
				setViewController,
				viewController
			})}
			{
				listaVoo.length ? (
					<VooList
						gridNumber={1}
						acao={true}
						listaVoo={listaVoo}
						onPress={function(voo : ListaVoo){
							setSelectedVoo(voo)
							setViewController({ ...viewController, modalConfirmar: true });
						}}
					/>
				) : (false)
			}
		</Container>
	);
}