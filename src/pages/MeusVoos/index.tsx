import React, { useState, useEffect } from "react";
import { TouchableOpacity } from "react-native";
import api from "../../services";
import { gridNumber } from "./styles";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { NavigationProps } from "./../../routes/types";
import { DefaultText, LinkText } from "./styles";
import {Title, FloatingButton, Container, VooList } from "../../components";
import { ListaVoo } from "../../interfaces/ListaVoo";
import { AxiosResponse } from "axios";
import { MaterialIcons } from "@expo/vector-icons";

export default function MeusVoos({ navigation }: NavigationProps) {
	const [listaVoo, setListaVoo] = useState<ListaVoo[]>([]);
	const [loading, setLoading] = useState<boolean>(true);

	navigation.addListener("beforeRemove", e => {
		// e.preventDefault();
	});
	useEffect(() => {
		async function getLista() {
			const token = await AsyncStorage.getItem("@token");
			const response = await callApi(500, token || "");
			setListaVoo(response.data.myFlights);
			setLoading(false);
		}
		getLista();
	}, []);
	return (
		<Container>
			<Title>Meus Voos</Title>
			{(function (navigation) {
				if (loading) {
					return <DefaultText>Carregando...</DefaultText>;
				}
				return (
					listaVoo.length? (
						<VooList
							gridNumber={gridNumber}
							acao={false}
							listaVoo={listaVoo}
						/>
					) : (
						<Container>
							<DefaultText>Você ainda não comprou vôos.</DefaultText>
							<TouchableOpacity
								onPress={() => navigation.navigate("BuscarVoos", {modal:true})}
							>
								<LinkText>Clique aqui ou no carrinho para comprar um!</LinkText>
							</TouchableOpacity>
						</Container>
					)
				)
				
			})(navigation)}
			<FloatingButton
				onPress={async () => {
					setLoading(true)
					navigation.navigate("BuscarVoos", {modal: true})
				}}
			>
				<MaterialIcons size={30} color={"#004071"} name="shopping-cart" />
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