import React, { useState, useEffect } from "react";
import { Text } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import api from "../../services/api";
import { styles, numberGrid } from "./styles";
import { MeusVoosProps } from "./../../routes/types";

interface ListaVoo {
	body: string;
	id: number;
	title: string;
	userId: string;
}

export default function MeusVoos({ route, navigation }: MeusVoosProps) {
	const [listaVoo, setListaVoo] = useState<ListaVoo[]>([]);
	navigation.addListener("beforeRemove", e => {
		e.preventDefault();
	});
	useEffect(() => {
		async function getLista() {
			console.log("========= BORA =============");
			const response = await api.get("/posts", {
				headers: {
					token: route.params.token,
				},
			});
			setListaVoo(response.data);
		}
		getLista();
	}, []);
	return (
		<FlatList
			style={styles.container}
			keyExtractor={(_, index) => String(index)}
			data={listaVoo}
			numColumns={numberGrid}
			key={numberGrid}
			renderItem={voo =>
				listaVoo.length ? (
					<Text style={styles.listItem}>{voo.item.body}</Text>
				) : (
					<Text style={styles.listItem}>Carregando...</Text>
				)
			}
		/>
	);
}
