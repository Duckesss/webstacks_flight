import React, { useState, useEffect } from "react";
import { TouchableOpacity, Text } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import api from "../../services/api";
import { gridNumber } from "./styles";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { NavigationProps } from "./../../routes/types";
import { AxiosResponse } from "axios";
import styles, { DefaultText, LinkText } from "./styles";
import Container from "../../components/Container";
import {Title, ListItem} from "../../components";
import { ListaVoo } from "../../interfaces/ListaVoo";
import { format,parseISO } from "date-fns";

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
				return listaVoo.length ? (
					<FlatList
						style={styles.container}
						keyExtractor={(_, index) => String(index)}
						data={listaVoo}
						numColumns={gridNumber}
						key={gridNumber}
						renderItem={voo => <ListItem>
							<Text style={{color: "white"}}>
								Preço: {moneyBR(voo.item.faresMoney)}
							</Text>
							<Text style={{color: "white"}}>
								Passageiros: {voo.item.passengers}
							</Text>
							<Text style={{color: "white"}}>
								Saída: {format(parseISO(voo.item.departure1), "dd/MM/yyyy")}
							</Text>
							<Text style={{color: "white"}}>
								Destino: {voo.item.destination.city}
							</Text>
						</ListItem>}
					/>
				) : (
					<Container>
						<DefaultText>Você ainda não comprou vôos.</DefaultText>
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
function moneyBR(numero : number) : string{
	const numDoisDecimais = (Math.round(numero*100)/100).toFixed(2)
	// coloca os pontos a cada 3 digitos e troca o último ponto por vírgula
	const regex = /(\d{3})(?=.*\d{3}\.)/g
	const num = numDoisDecimais.replace(regex,'$1.').replace(/\.(?!.*\.)/,',') 
		
	return `R$ ${num}`
}