import React, {useState} from "react";
import {
	Modal,
	Select,
	FakeInput,
} from "../../../components";
import { ViewController, Campos } from ".././interfaces";
import { ListaVoo, Aeroporto } from "../../../interfaces";
import Utils from "../../../Utils";
import { Picker } from "@react-native-picker/picker";
import DateTimePicker from "@react-native-community/datetimepicker";
import styles, { Input, SearchButton, inputPadding } from "./styles";
import { Text } from "react-native";
import { State } from "../interfaces";
import api from "../../../services";

interface Props {
	viewController: ViewController;
	setState: React.Dispatch<React.SetStateAction<State>>;
	listaAeroportos: Aeroporto[];
}

export default function modalPesquisarVoos(props : Props) {
	const [campos, setCampos] = useState<Campos>({
		origem: "",
		destino: "",
		saida: "",
		numPassageiros: "",
		volta: "",
	});
	const [dataVolta, setDataVolta] = useState<Date>(new Date());
	const [dataSaida, setDataSaida] = useState<Date>(new Date());
	return (
		<Modal
			position="bottom"
			animationType="slide"
			transparent={true}
			visible={props.viewController.modal}
			onRequestClose={() =>
				props.setState(prev => ({
					...prev,
					viewController:{
						...prev.viewController,
						modal:false
					}
				}))
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
				{props.listaAeroportos.map(
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
				onValueChange={(value: any) =>{
					setCampos({ ...campos, destino: String(value) })
				}}
			>
				{props.listaAeroportos.map(
					(aeroporto: Aeroporto, idx: number) => (
						<Picker.Item
							label={aeroporto.name}
							value={aeroporto.code}
							key={idx}
						/>
					)
				)}
			</Select>

			{props.viewController.calendarioSaida && (
				<DateTimePicker
					value={dataSaida}
					minimumDate={new Date()}
					onChange={(
						event: any,
						selectedDate: Date | undefined
					) => {
						if (selectedDate) {
							const date = selectedDate;
							let novaData = `${Utils.pad(date.getDate())}/${Utils.pad(
								date.getMonth() + 1
							)}/${date.getFullYear()}`;


							
							props.setState(prev => ({
								...prev,
								viewController:{
									...prev.viewController,
									calendarioSaida: false,
								}
							}))
							setCampos({
								...campos,
								saida: novaData,
							});
							setDataSaida(date);
						}
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
					props.setState(prev => ({
						...prev,
						viewController:{
							...prev.viewController,
							calendarioSaida: true,
						}
					}))
				}}
			/>
			<Input
				value={campos.numPassageiros}
				placeholder="Número de passageiros (1 a 9)"
				keyboardType={"numeric"}
				onChangeText={(text: string) => {
					text = text.replace(/[^\d]/g, "");
					if (Number(text) > 9) text = text[0];

					setCampos({
						...campos,
						numPassageiros: text,
					});
				}}
			/>

			{props.viewController.calendarioVolta && (
				<DateTimePicker
					value={dataVolta}
					minimumDate={new Date()}
					onChange={(
						event: any,
						selectedDate: Date | undefined
					) => {
						if (selectedDate) {
							const date = selectedDate;
							let novaData = `${Utils.pad(date.getDate())}/${Utils.pad(
								date.getMonth() + 1
							)}/${date.getFullYear()}`;
							props.setState(prev => ({
								...prev,
								viewController:{
									...prev.viewController,
									calendarioVolta: false,
								}
							}))
							setCampos({
								...campos,
								volta: novaData,
							});
							setDataVolta(date);
						}
					}}
				/>
			)}

			<FakeInput
				placeholder="Data de volta"
				placeholderColor="#575757"
				value={campos.volta}
				style={[
					styles.input,
					{
						borderColor: "#838383",
					},
				]}
				onPress={() => {
					props.setState(prev => ({
						...prev,
						viewController:{
							...prev.viewController,
							calendarioVolta: true,
						}
					}))
				}}
			/>
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
			<SearchButton 
				style={{marginTop:10}}
				onPress={async () => {
					const camposVazios = Object.entries(campos).some(campo => {
						if(campo[0] !== "volta")
							return campo[1] === ""
					})
					if(camposVazios){
						console.log("CAMPO VAZIO")
					}else{
						props.setState(prev => ({
							...prev,
							viewController:{
								...prev.viewController,
								loading: true,
								modal: false
							}
						}))
						const response = await api.get(`/search/?
							origin=${campos.origem}
							&destination=${campos.destino}
							&departure1=${Utils.formataData(campos.saida)}
							&passengers=${campos.numPassageiros}
							${
								campos.volta?
									`&departure2=${Utils.formataData(campos.volta)}`
								:
									''
							}
						`)
						console.log(`${
							campos.volta?
								`&departure2=${Utils.formataData(campos.volta)}`
							:
								''
						}`,response.data)
						props.setState(prev => ({
							...prev,
							viewController:{
								...prev.viewController,
								loading: false,
								modal: false,
								filter: true
							},
							listaVoo:response.data
						}))
					}
				}} 
			/>
		</Modal>
	);
}
