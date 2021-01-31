import React, { useState, useEffect } from "react";
import { TouchableOpacity } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import api from "../../services/api";
import { gridNumber } from "./styles";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { NavigationProps } from "./../../routes/types";
import { AxiosResponse } from "axios";
import { DefaultText, LinkText, ListItem } from "./styles";
import Container from "../../components/Container";
import Title from "../../components/Title";
import { ListaVoo } from "../../interfaces/ListaVoo";

export default function MeusVoos({ navigation }: NavigationProps) {
	const [listaVoo, setListaVoo] = useState<ListaVoo[]>([]);
	const [loading, setLoading] = useState<boolean>(true);

	navigation.addListener("beforeRemove", e => {
		e.preventDefault();
	});
	useEffect(() => {
		async function getLista() {
			const token = await AsyncStorage.getItem("@token");
			const response = await callApi(500, token || "");
			setListaVoo(response.data);
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
				return listaVoo.length ? (
					<FlatList
						keyExtractor={(_, index) => String(index)}
						data={listaVoo}
						numColumns={gridNumber}
						key={gridNumber}
						renderItem={voo => <ListItem>{voo.item.body}</ListItem>}
					/>
				) : (
					<Container>
						<DefaultText>Você ainda não comprou voos.</DefaultText>
						<TouchableOpacity
							onPress={() => navigation.navigate("BuscarVoos")}
						>
							<LinkText>Clique aqui para comprar um!</LinkText>
						</TouchableOpacity>
					</Container>
				);
			})(navigation)}
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
