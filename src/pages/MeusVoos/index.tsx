import React, { useState, useEffect } from "react";
import { Text, TouchableOpacity } from "react-native";
import api from "../../services";
import styles from "./styles";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { NavigationProps } from "./../../routes/types";
import {Title, FloatingButton, Container, VooList, Loading, Sidebar } from "../../components";
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
		if(e.data.action.type === "GO_BACK")
			e.preventDefault()
		return true
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
			<Sidebar
				navigation={navigation}
			/>
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