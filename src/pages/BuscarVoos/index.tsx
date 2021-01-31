import React, { useState } from "react";
import { Modal, Title, FloatingButton, Container } from "../../components";
import { ListaVoo } from "../../interfaces/ListaVoo";
import { NavigationProps } from "./../../routes/types";
import { MaterialIcons } from "@expo/vector-icons";
import { Input, SearchButton } from "./styles";

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
				<Input placeholder="Origin" />
				<Input placeholder="Destination" />
				<Input placeholder="Departure1" />
				<Input placeholder="Passengers" />
				<Input placeholder="Departure2" />
				<SearchButton onPress={() => console.log("void")} />
			</Modal>
		</Container>
	);
}
