import React, { useState } from "react";
import { Modal, Title, FloatingButton, Container } from "../../components";
import { ListaVoo } from "../../interfaces/ListaVoo";
import { NavigationProps } from "./../../routes/types";
import { MaterialIcons } from "@expo/vector-icons";
import { Input, SearchButton, inputPadding } from "./styles";
import { Text } from "react-native";

export default function BuscarVoos({ navigation }: NavigationProps) {
	const [listaVoo, setListaVoo] = useState<ListaVoo[]>([]);
	const [pesquisarVoo, setPesquisarVoo] = useState<boolean>(false);
	return (
		<Container>
			<Title>Buscar Voos</Title>
			<FloatingButton onPress={() => setPesquisarVoo(true)}>
				<MaterialIcons size={30} color={"#004071"} name="search" />
			</FloatingButton>
			<Modal
				position="bottom"
				animationType="slide"
				transparent={true}
				visible={pesquisarVoo}
			>
				<Input placeholder="Aeroporto de origem" />
				<Input placeholder="Aeroporto de destino" />
				<Input placeholder="Data de saída" />
				<Input placeholder="Número de passageiros" />
				<Input placeholder="Data de volta" />
				<Text
					style={{
						fontSize: 12,
						marginTop: 5,
						alignSelf: "flex-start",
						paddingLeft: inputPadding,
					}}
				>
					*Em caso de ida e volta
				</Text>
				<SearchButton onPress={() => console.log("void")} />
			</Modal>
		</Container>
	);
}
