import React, { useState } from "react";
import {
	Modal,
	Title,
	FloatingButton,
	Container,
	Loading,
	Select,
	FakeInput,
} from "../../components";
import { ListaVoo } from "../../interfaces/ListaVoo";
import { NavigationProps } from "./../../routes/types";
import { Picker } from "@react-native-picker/picker";
import DateTimePicker from "@react-native-community/datetimepicker";
import { MaterialIcons } from "@expo/vector-icons";
import { DateTime } from "luxon";
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
interface ViewController {
	modal: boolean;
	calendario: boolean;
	loading: boolean;
}
export default function BuscarVoos({ navigation }: NavigationProps) {
	const [listaVoo, setListaVoo] = useState<ListaVoo[]>([]);
	const [dataSelecionada, setDataSelecionada] = useState<Date>(new Date());
	const [campos, setCampos] = useState<Campos>({
		origem: "",
		destino: "",
		saida: "",
		numPassageiros: "",
		volta: "",
	});
	const [viewController, setViewController] = useState<ViewController>({
		modal: false,
		calendario: false,
		loading: false,
	});
	const [listaAeroportos, setListaAeroportos] = useState<Aeroporto[]>([]);
	const [buscaAeroportos, setBuscaAeroportos] = useState<boolean>(true);
	return (
		<Container pointerEvents={viewController.loading ? "none" : "auto"}>
			<Title>Buscar Voos</Title>
			{viewController.loading && <Loading />}
			<FloatingButton
				onPress={async () => {
					setViewController({ ...viewController, loading: true });
					if (buscaAeroportos === true) {
						setListaAeroportos(await getAeroportos());
						setBuscaAeroportos(false);
					}
					setViewController({ ...viewController, loading: false });
					setViewController({ ...viewController, modal: true });
				}}
			>
				<MaterialIcons size={30} color={"#004071"} name="search" />
			</FloatingButton>

			<Modal
				position="bottom"
				animationType="slide"
				transparent={true}
				visible={viewController.modal}
				onRequestClose={() =>
					setViewController({ ...viewController, modal: false })
				}
			>
				<Select
					key={`${campos.origem}_origem`}
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
					key={`${campos.destino}_destino`}
					selectedValue={campos.destino}
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

				{viewController.calendario && (
					<DateTimePicker
						value={dataSelecionada}
						minimumDate={new Date()}
						onChange={(
							event: any,
							selectedDate: Date | undefined
						) => {
							const date = selectedDate || dataSelecionada;
							let novaData = `${pad(date.getDate())}/${pad(
								date.getMonth() + 1
							)}/${date.getFullYear()}`;
							setViewController({
								...viewController,
								calendario: false,
							});
							setCampos({
								...campos,
								saida: novaData,
							});
							setDataSelecionada(date);
						}}
					/>
				)}

				<FakeInput
					placeholder="Data de saída"
					placeholderColor="#575757"
					value={campos.saida}
					style={[
						styles.input,
						{
							borderColor: "#838383",
						},
					]}
					onPress={() => {
						setViewController({
							...viewController,
							calendario: true,
						});
					}}
				/>
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

function pad(value: number) {
	return value > 9 ? value : "0" + value;
}
