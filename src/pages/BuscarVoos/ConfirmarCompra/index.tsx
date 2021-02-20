import React from "react";
import {
	Modal,
} from "../../../components";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ViewController } from ".././interfaces";
import { ListaVoo } from "../../../interfaces";
import styles from "./styles";
import { Text, View, TouchableOpacity } from "react-native";
import api from "../../../services";
import { State } from "../interfaces";


interface Props {
	viewController: ViewController;
	selectedVoo: ListaVoo;
	setState: React.Dispatch<React.SetStateAction<State>>;
	listaVoo : ListaVoo[];
}

export default function modalConfirmarCompra(props : Props){
	return (
		<Modal
			position="center"
			animationType="slide"
			containerStyle={styles.modalContainerStyle}
			visible={props.viewController.modalConfirmar}
			onRequestClose={() =>
				props.setState(prev => ({
					...prev,
					viewController:{
						...prev.viewController,
						modalConfirmar:false
					}
				}))
			}
		>
			<Text style={styles.confirmarCompraTxt}>
				Deseja confirmar a compra?
			</Text>
			<View style={styles.row}>
				<TouchableOpacity 
					style={[styles.button,styles.confirmar]}
					onPress={async () => {
						try{
							props.setState(prev => ({
								...prev,
								viewController:{
									...prev.viewController,
									modalConfirmar:false,
									loading:true
								}
							}))
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

							props.setState(prev => ({
								...prev,
								viewController:{
									...prev.viewController,
									modalConfirmar: false,
									loading: false
								},
								listaVoo: props.listaVoo
							}))
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
						props.setState(prev => ({
							...prev,
							viewController:{
								...prev.viewController,
								modalConfirmar: false,
							},
						}))
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
