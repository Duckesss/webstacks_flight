import React from "react";
import { View, TextInput, TextInputProps, StyleSheet } from "react-native";
const contentWidth = 80;
const borderRadius = 7;

const styles = StyleSheet.create({
	inputArea: {
		flexDirection: "row",
	},
	inputStyle: {
		backgroundColor: "#000000",
		fontSize: 17,
		flex: 1,
		color: "#fff",
		marginBottom: 15,
		padding: 13,
		borderRadius: borderRadius,
	},
	center: {
		justifyContent: "center",
		alignItems: "center",
		flex: 1,
	},
	submitButton:{
		alignItems:"center",
		justifyContent:"center",
		backgroundColor:"#004071",
		width: `${contentWidth - 30}%`,
		height:45,
		borderRadius:borderRadius,
		marginTop:0
	},
	submitText:{
		fontSize:20,
		color:"#fff"
	},
	logo:{
		width: 300,
		height:160,
		top:-70,
		marginBottom:-10
	}
});
export default styles;
export function Input(props: TextInputProps) {
	return (
		<View style={styles.inputArea}>
			<TextInput
				autoCorrect={false}
				placeholderTextColor="#a8a8a8"
				style={styles.inputStyle}
				{...props}
			/>
		</View>
	);
}
