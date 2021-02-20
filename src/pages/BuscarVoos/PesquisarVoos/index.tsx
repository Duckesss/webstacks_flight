import React, {useState} from "react";
import {
	Modal,
	Select,
	FakeInput,
} from "../../../components";
import { ViewController, ModalPesquisa } from ".././interfaces";
import { Aeroporto } from "../../../interfaces";
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
	modalPesquisa: ModalPesquisa;
}
const itemVazio = 
<Picker.Item
	label={""}
	value={""}
	key={0}
/>

export default function modalPesquisarVoos(props : Props) {
	const {campos,attrs} = props.modalPesquisa
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
					props.setState(prev => ({
						...prev,
						modalPesquisa:{
							...prev.modalPesquisa,
							campos: {
								...campos,
								origem: String(value)
							}
						}
					}))
				}
			>
				{
					[itemVazio].concat(
						props.listaAeroportos.map(
							(aeroporto: Aeroporto, idx: number) => (
								<Picker.Item
									label={aeroporto.name}
									value={aeroporto.code}
									key={idx+1}
								/>
							)
						)
					)
				}
			</Select>
			<Select
				labelText="Aeroporto de destino:"
				key={`${campos.destino}_destino`}
				selectedValue={campos.destino}
				labelProps={{
					style: styles.label,
				}}
				onValueChange={(value: any) =>{
					props.setState(prev => ({
						...prev,
						modalPesquisa:{
							...prev.modalPesquisa,
							campos: {
								...campos,
								destino: String(value)
							}
						}
					}))
				}}
			>
				{
					[itemVazio].concat(
						props.listaAeroportos.map(
							(aeroporto: Aeroporto, idx: number) => (
								<Picker.Item
									label={aeroporto.name}
									value={aeroporto.code}
									key={idx+1}
								/>
							)
						)
					)
				}
			</Select>

			{props.viewController.calendarioSaida && (
				<DateTimePicker
					value={attrs.dataSaida}
					minimumDate={new Date()}
					neutralButtonLabel="Limpar"
					onChange={(
						event: any,
						selectedDate: Date | undefined
					) => {
						if(event.type === 'neutralButtonPressed'){
							props.setState(prev => ({
								...prev,
								viewController:{
									...prev.viewController,
									calendarioSaida:false
								},
								modalPesquisa:{
									...prev.modalPesquisa,
									campos: {
										...campos,
										saida: "",
									},
									attrs:{
										...attrs,
										dataSaida: new Date()
									}
								}
							}))
							return
						}
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
								},
								modalPesquisa:{
									...prev.modalPesquisa,
									campos: {
										...campos,
										saida: novaData,
									},
									attrs:{
										...attrs,
										dataSaida: date
									}
								}
							}))
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
					
					props.setState(prev => ({
						...prev,
						modalPesquisa:{
							...prev.modalPesquisa,
							campos: {
								...campos,
								numPassageiros: text,
							},
						}
					}))
				}}
			/>

			{props.viewController.calendarioVolta && (
				<DateTimePicker
					value={attrs.dataVolta}
					minimumDate={new Date()}
					neutralButtonLabel="Limpar"
					onChange={(
						event: any,
						selectedDate: Date | undefined
					) => {
						if(event.type === 'neutralButtonPressed'){
							props.setState(prev => ({
								...prev,
								
								viewController:{
									...prev.viewController,
									calendarioVolta:false
								},
								modalPesquisa:{
									...prev.modalPesquisa,
									campos: {
										...campos,
										volta: "",
									},
									attrs:{
										...attrs,
										dataVolta: new Date()
									}
								}
							}))
							return
						}
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
								},
								modalPesquisa:{
									...prev.modalPesquisa,
									campos: {
										...campos,
										volta: novaData,
									},
									attrs:{
										...attrs,
										dataVolta: date
									}
								}
							}))
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
					const todosVazios = Object.values(campos).every(value => value === "")
					if(todosVazios){
						props.setState(prev => ({
							...prev,
							page: 1,
							viewController:{
								...prev.viewController,
								modal: false
							}
						}))
						return
					}
					const camposVazios = Object.entries(campos).some(([key,value]) => {
						if(key !== "volta")
							return value === ""
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
						props.setState(prev => ({
							...prev,
							viewController:{
								...prev.viewController,
								loading: false,
								modal: false,
								filter: true,
								exibePaginas: false
							},
							listaVoo:response.data
						}))
					}
				}} 
			/>
		</Modal>
	);
}
