import React, { useState, useEffect } from "react";
import { TouchableOpacity } from "react-native";
import api from "../../services";
import { gridNumber } from "./styles";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { NavigationProps } from "./../../routes/types";
import { DefaultText, LinkText } from "./styles";
import {Title, FloatingButton, Container, VooList, Loading } from "../../components";
import { ListaVoo } from "../../interfaces";
import { AxiosResponse } from "axios";
import Icon from 'react-native-vector-icons/MaterialIcons';


interface MyFlights{
	voosRepetidos: {
		[key:string]:number;
	};
	voos: ListaVoo[];
}

export default function MeusVoos({ navigation }: NavigationProps) {
	const [listaVoo, setListaVoo] = useState<MyFlights>({
		voosRepetidos: {},
		voos: []
	});
	const [loading, setLoading] = useState<boolean>(true);
	const [getListaVoo, setGetListaVoo] = useState<boolean>(true);

	navigation.addListener("beforeRemove", e => {
		e.preventDefault();
	});
	useEffect(() => {
		async function getLista() {
			const token = await AsyncStorage.getItem("@token");
			const response = await callApi(500, token || "");
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
			setListaVoo(lista);
			setLoading(false);
		}
		getLista();
		return () => setGetListaVoo(true)
	});
	return (
		<Container>
			<Title>Meus Voos</Title>
			{loading && <Loading />}
			{
				listaVoo.voos.length ? (
					<VooList
						gridNumber={1}
						acao={false}
						repetidos={listaVoo.voosRepetidos}
						listaVoo={listaVoo.voos}
					/>
				) : (
					!loading && 
					<Container>
						<DefaultText>Você ainda não comprou voos.</DefaultText>
						<TouchableOpacity
							onPress={() => navigation.navigate("BuscarVoos")}
						>
							<LinkText>Clique aqui ou no carrinho para comprar um!</LinkText>
						</TouchableOpacity>
					</Container>
				)
			}
			<FloatingButton
				onPress={() => {
					setLoading(true)
					navigation.navigate("BuscarVoos")
				}}
			>
				{(<Icon size={30} color={"#004071"} name={"shopping-cart"}/>)}
			</FloatingButton>
		</Container>
	);
}
function callApi(timeout: number, token: string): Promise<AxiosResponse> {
	return new Promise((resolve, reject) => {
		setTimeout(async () => {
			try {
				if (!token) throw "Token nao informado";
				const response = await api.get("/my-flights", {
					headers: { Authorization: token },
				});
				resolve(response);
			} catch (err) {
				reject(err);
			}
		}, timeout);
	});
}