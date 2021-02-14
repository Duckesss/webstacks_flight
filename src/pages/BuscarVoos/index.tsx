import React, { useEffect, useState } from "react";
import {
	Modal,
	Title,
	FloatingButton,
	Container,
	Loading,
	Select,
	FakeInput,
	VooList
} from "../../components";
import Toast from "react-native-toast-message";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ViewController, Campos } from "./interfaces";
import { ListaVoo, Aeroporto } from "../../interfaces";
import { NavigationProps } from "./../../routes/types";
import Utils from "../../Utils";
import { Picker } from "@react-native-picker/picker";
import DateTimePicker from "@react-native-community/datetimepicker";
import Icon from 'react-native-vector-icons/MaterialIcons';
import styles, { Input, SearchButton, inputPadding } from "./styles";
import { Text, View, TouchableOpacity } from "react-native";
import api from "../../services";

export default function BuscarVoos({ navigation }: NavigationProps) {
	const [listaVoo, setListaVoo] = useState<ListaVoo[]>([]);
	const [selectedVoo, setSelectedVoo] = useState<ListaVoo>({} as ListaVoo);
	const [dataSaida, setDataSaida] = useState<Date>(new Date());
	const [dataVolta, setDataVolta] = useState<Date>(new Date());
	const [campos, setCampos] = useState<Campos>({
		origem: "",
		destino: "",
		saida: "",
		numPassageiros: "",
		volta: "",
	});
	const [viewController, setViewController] = useState<ViewController>({
		modal: false,
		calendarioSaida: false,
		loading: true,
		modalConfirmar: false,
		calendarioVolta: false,
	});
	const [listaAeroportos, setListaAeroportos] = useState<Aeroporto[]>([]);
	const [buscaAeroportos, setBuscaAeroportos] = useState<boolean>(true);
	useEffect(() => {
		if(viewController.modal && buscaAeroportos === true){
			setViewController({ ...viewController, loading: true });
				Utils.getAeroportos().then(aeroportos => {
					setListaAeroportos(aeroportos);
					setBuscaAeroportos(false);
					setViewController({ ...viewController, loading: false });
				})
		}
		return () => {setBuscaAeroportos(true);}
	},[viewController.modal])
	useEffect(() => {
		api.get("/voo/?&page=1").then(response => {
			setListaVoo(response.data)
			setViewController({
				...viewController,
				loading:false
			})
		})
	},[])
	return (
		<Container pointerEvents={viewController.loading ? "none" : "auto"}>
			<Title>Buscar Voos</Title>
			{viewController.loading && <Loading />}
			<FloatingButton
				onPress={() => {
					setViewController({ ...viewController, modal: true });
				}}
			>
				{(<Icon size={30} color={"#004071"} name="search" />)}
			</FloatingButton>
			{modalConfirmarCompra()}
			{modalPesquisarVoos()}
			{
				listaVoo.length ? (
					<VooList
						gridNumber={1}
						acao={true}
						listaVoo={listaVoo}
						onPress={function(voo : ListaVoo){
							setSelectedVoo(voo)
							setViewController({ ...viewController, modalConfirmar: true });
						}}
					/>
				) : (false)
			}
		</Container>
	);

	function modalConfirmarCompra(){
		return (
			<Modal
				position="center"
				animationType="slide"
				containerStyle={{
					width:300,
					height:110,
					padding:15,
				}}
				visible={viewController.modalConfirmar}
				onRequestClose={() =>
					setViewController({ ...viewController, modalConfirmar: false })
				}
			>
				<Text style={{
					fontSize: 21,
					marginBottom:10
				}}>
					Deseja confirmar a compra?
				</Text>
				<View style={styles.row}>
					<TouchableOpacity 
						style={[styles.button,styles.confirmar]}
						onPress={async () => {
							setViewController({
								...viewController,
								modalConfirmar: false,
								loading: true
							})
							const token = await AsyncStorage.getItem("@token")
							const response = await api.post("/checkout",{
								purchase:{					
									"flight1": selectedVoo._id,
									"passengers": 1,
									"cost": selectedVoo.faresMoney
								}
							},{
								headers:{
									authorization: token
								}
							})
							await AsyncStorage.setItem("@token",response.data?.token)
							let vooAtualizado = listaVoo.find(voo => voo._id === selectedVoo._id)
							if(vooAtualizado)
								++vooAtualizado.passengers;

							setListaVoo(listaVoo)
							setViewController({
								...viewController,
								modalConfirmar: false,
								loading: false
							})
						}}
					>
						<Text style={styles.buttonText}>
							Confirmar
						</Text>
					</TouchableOpacity>
					<TouchableOpacity 
						style={[styles.button,styles.cancelar]}
						onPress={() => {
							console.log('cancelar')
							setViewController({...viewController,modalConfirmar:false})
						}}
					>
						<Text style={styles.buttonText}>
							Cancelar
						</Text>
					</TouchableOpacity>
				</View>
			</Modal>
		);
	}

	function modalPesquisarVoos() {
		return (
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
					onValueChange={(value: any) =>{
						setCampos({ ...campos, destino: String(value) })
					}}
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

				{viewController.calendarioSaida && (
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
								setViewController({
									...viewController,
									calendarioSaida: false,
								});
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
						setViewController({
							...viewController,
							calendarioSaida: true,
						});
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

				{viewController.calendarioVolta && (
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
								setViewController({
									...viewController,
									calendarioVolta: false,
								});
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
						setViewController({
							...viewController,
							calendarioVolta: true,
						});
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
							Toast.show({
								type: "error",
								text1: "Preencha os campos corretamente!",
								topOffset: 50,
							});
						}else{
							setViewController({...viewController,loading: true, modal: false})
							const response = await api.get(`/search/?
								origin=${campos.origem}
								&destination=${campos.destino}
								&departure1=${Utils.formataData(campos.saida)}
								&passengers=${campos.numPassageiros}
							`)
							setListaVoo(response.data)
							setViewController({...viewController,loading: false, modal: false})
						}
					}} 
				/>
			</Modal>
		);
	}
}
