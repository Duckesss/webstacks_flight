import React from "react";
import {
	StyleSheet,
	View,
	TextInput,
	Text,
	TextInputProps,
	TouchableOpacityProps,
} from "react-native";
export const inputPadding = 10;
const inputWidth = 300;
const styles = StyleSheet.create({
	row:{
		flexDirection:"row",
	},
	confirmar:{
		backgroundColor: "green",
		marginRight: 5,
	},
	confirmarCompraTxt:{
		fontSize: 21,
		marginBottom:10
	},
	cancelar:{
		marginLeft: 5,
		backgroundColor: "red",
	},
	button:{
		borderRadius: 8,
		padding:20,
		height:30,
		justifyContent:"center"
	},
	buttonText:{
		color: "white",
		fontSize:20
	},
	modalContainerStyle:{
		width:300,
		height:110,
		padding:15,
	}
});

export default styles;
