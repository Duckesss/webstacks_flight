import React, { useEffect, useState } from "react";
import {
	Modal,
	Title,
	FloatingButton,
	Container,
	Loading,
	Select,
	FakeInput,
	VooList,
	Sidebar
} from "../../../components";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ViewController, Campos } from ".././interfaces";
import { ListaVoo, Aeroporto } from "../../../interfaces";
import Utils from "../../../Utils";
import { Picker } from "@react-native-picker/picker";
import DateTimePicker from "@react-native-community/datetimepicker";
import Icon from 'react-native-vector-icons/MaterialIcons';
import styles from "./styles";
import { Text, View, TouchableOpacity } from "react-native";
import api from "../../../services";

interface Props {
	viewController: ViewController;
	setViewController: React.Dispatch<React.SetStateAction<ViewController>>;
	selectedVoo: ListaVoo;
	listaVoo : ListaVoo[];
	setListaVoo: React.Dispatch<React.SetStateAction<ListaVoo[]>>;
}

export default function modalConfirmarCompra(props : Props){
	return (
		<Modal
			position="center"
			animationType="slide"
			containerStyle={{
				width:300,
				height:110,
				padding:15,
			}}
			visible={props.viewController.modalConfirmar}
			onRequestClose={() =>
				props.setViewController({ ...props.viewController, modalConfirmar: false })
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
						try{
							props.setViewController({
								...props.viewController,
								modalConfirmar: false,
								loading: true
							})
							const token = await AsyncStorage.getItem("@token")
							const response = await api.post("/checkout",{
								purchase:{					
									"flight1": props.selectedVoo._id,
									"passengers": 1,
									"cost": props.selectedVoo.faresMoney
								}
							},{
								headers:{
									authorization: token
								}
							})
							await AsyncStorage.setItem("@token",response.data?.token)
							let vooAtualizado = props.listaVoo.find(voo => voo._id === props.selectedVoo._id)
							if(vooAtualizado)
								++vooAtualizado.passengers;

							props.setListaVoo(props.listaVoo)
							props.setViewController({
								...props.viewController,
								modalConfirmar: false,
								loading: false
							})
						}catch(err){
							console.log(err)
							console.log(err?.response?.data)
						}
					}}
				>
					<Text style={styles.buttonText}>
						Confirmar
					</Text>
				</TouchableOpacity>
				<TouchableOpacity 
					style={[styles.button,styles.cancelar]}
					onPress={() => {
						props.setViewController({...props.viewController,modalConfirmar:false})
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
