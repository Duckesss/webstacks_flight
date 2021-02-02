import React, { useState } from "react";
import {
	Modal,
	Title,
	FloatingButton,
	Container,
	Loading,
	Select,
} from "../../components";
import { ListaVoo } from "../../interfaces/ListaVoo";
import { NavigationProps } from "./../../routes/types";
import { Picker } from "@react-native-picker/picker";
import { MaterialIcons } from "@expo/vector-icons";
import styles, { Input, SearchButton, inputPadding } from "./styles";
import { Text } from "react-native";
import api from "../../services/api";
interface Aeroporto {
	code: string;
	name: string;
	city: string;
	country: string;
	timezone: string;
}
interface Campos {
	origem: string;
	destino: string;
	saida: string;
	numPassageiros: string;
	volta?: string;
}
async function getAeroportos() {
	try {
		const response = await api.get("/locations");
		return response.data;
	} catch (err) {
		return [];
	}
}

export default function BuscarVoos({ navigation }: NavigationProps) {
	const [listaVoo, setListaVoo] = useState<ListaVoo[]>([]);
	const [campos, setCampos] = useState<Campos>({
		origem: "",
		destino: "",
		saida: "",
		numPassageiros: "",
		volta: "",
	});
	const [listaAeroportos, setListaAeroportos] = useState<Aeroporto[]>([]);
	const [abreModal, setAbreModal] = useState<boolean>(false);
	const [loading, setLoading] = useState<boolean>(false);
	const [buscaAeroportos, setBuscaAeroportos] = useState<boolean>(true);
	return (
		<Container pointerEvents={loading ? "none" : "auto"}>
			<Title>Buscar Voos</Title>
			{loading && <Loading />}
			<FloatingButton
				onPress={async () => {
					setLoading(true);
					if (buscaAeroportos === true) {
						setListaAeroportos(await getAeroportos());
						setBuscaAeroportos(false);
					}
					setLoading(false);
					setAbreModal(true);
				}}
			>
				<MaterialIcons size={30} color={"#004071"} name="search" />
			</FloatingButton>

			<Modal
				position="bottom"
				animationType="slide"
				transparent={true}
				visible={abreModal}
				onRequestClose={() => setAbreModal(false)}
			>
				<Select
					key={campos.origem}
					selectedValue={campos.origem}
					labelText="Aeroporto de origem:"
					labelProps={{
						style: styles.label,
					}}
					onValueChange={(value: any) =>
						setCampos({ ...campos, origem: String(value) })
					}
				>
					{listaAeroportos.map(
						(aeroporto: Aeroporto, idx: number) => (
							<Picker.Item
								label={aeroporto.name}
								value={aeroporto.code}
								key={idx}
							/>
						)
					)}
				</Select>
				<Select
					labelText="Aeroporto de destino:"
					selectedValue={campos.destino}
					key={campos.destino}
					labelProps={{
						style: styles.label,
					}}
					onValueChange={(value: any) =>
						setCampos({ ...campos, destino: String(value) })
					}
				>
					{listaAeroportos.map(
						(aeroporto: Aeroporto, idx: number) => (
							<Picker.Item
								label={aeroporto.name}
								value={aeroporto.code}
								key={idx}
							/>
						)
					)}
				</Select>
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
