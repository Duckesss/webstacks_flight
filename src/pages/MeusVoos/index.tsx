import React, { useState, useEffect } from "react";
import { View, Text, TouchableWithoutFeedback } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import api from "../../services/api";
import { styles, numberGrid } from "./styles";
import { MeusVoosProps } from "./../../routes/types";
import { AxiosResponse } from "axios";

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
			console.log("========= BORA =============");
			const response = await callApi(500, route.params.token);
			setLoading(false);
			console.log("Response=", response.data);
			setListaVoo(response.data);
		}
		getLista();
	}, []);
	return (
		<View style={styles.container}>
			<Text style={styles.title}>Meus Voos</Text>
			{(function () {
				if (loading) {
					return (
						<Text style={styles.defaultText}>Carregando...</Text>
					);
				}
				return listaVoo.length ? (
					<FlatList
						keyExtractor={(_, index) => String(index)}
						data={listaVoo}
						numColumns={numberGrid}
						key={numberGrid}
						renderItem={voo => (
							<Text style={styles.listItem}>{voo.item.body}</Text>
						)}
					/>
				) : (
					<View style={styles.textContainer}>
						<Text style={styles.defaultText}>
							Você ainda não comprou voos.
						</Text>
						<TouchableWithoutFeedback
							onPress={() => navigation.navigate("Login")}
						>
							<Text
								style={{
									...styles.defaultText,
									fontSize: styles.defaultText.fontSize / 2,
									color: "blue",
								}}
							>
								Clique aqui para comprar um!
							</Text>
						</TouchableWithoutFeedback>
					</View>
				);
			})()}
		</View>
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
