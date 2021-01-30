import React, { useState, useEffect } from "react";
import { TouchableOpacity } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import api from "../../services/api";
import { gridNumber } from "./styles";
import { MeusVoosProps } from "./../../routes/types";
import { AxiosResponse } from "axios";
import { Container, Title, DefaultText, LinkText, ListItem } from "./styles";

interface ListaVoo {
	body: string;
	id: number;
	title: string;
	userId: string;
}
export default function MeusVoos({ route, navigation }: MeusVoosProps) {
	const [listaVoo, setListaVoo] = useState<ListaVoo[]>([]);
	const [loading, setLoading] = useState<boolean>(true);
	navigation.addListener("beforeRemove", e => {
		e.preventDefault();
	});
	useEffect(() => {
		async function getLista() {
			const response = await callApi(500, route.params.token);
			setLoading(false);
			setListaVoo(response.data);
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
							onPress={() => {
								console.log("navigate");
								navigation.navigate("BuscarVoos", {
									token: route.params.token,
								});
							}}
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
