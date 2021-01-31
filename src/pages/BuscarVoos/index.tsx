import React, { useState } from "react";
import { ListaVoo } from "../../interfaces/ListaVoo";
import { NavigationProps } from "./../../routes/types";
import { MaterialIcons } from "@expo/vector-icons";
import Title from "../../components/Title";
import { FloatingButton } from "./styles";
import Container from "../../components/Container";

export default function BuscarVoos({ navigation }: NavigationProps) {
	const [listaVoo, setListaVoo] = useState<ListaVoo[]>([]);

	return (
		<Container>
			<Title>Buscar Voos</Title>
			<FloatingButton>
				<MaterialIcons
					size={30}
					color={"#004071"}
					name="search"
				></MaterialIcons>
			</FloatingButton>
		</Container>
	);
}
