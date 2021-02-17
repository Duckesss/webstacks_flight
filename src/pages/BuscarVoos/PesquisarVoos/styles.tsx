import React from "react";
import {
	StyleSheet,
	View,
	TextInput,
	Text,
	TextInputProps,
	TouchableOpacityProps,
} from "react-native";
import Icon from 'react-native-vector-icons/MaterialIcons';
import { TouchableOpacity } from "react-native";
export const inputPadding = 10;
const inputWidth = 300;
const styles = StyleSheet.create({
	input: {
		padding: inputPadding,
		borderBottomWidth: 1,
		borderRadius: 10,
		width: inputWidth,
	},
	label: {
		color: "#575757",
		paddingHorizontal: inputPadding,
		marginBottom: -inputPadding,
		width: inputWidth,
	},
	searchContainer: {
		flexDirection: "row",
		alignItems: "center",
		marginTop: 20,
	},
	searchText: {
		color: "#004071",
		fontWeight: "bold",
		fontSize: 20,
		marginRight: 5,
	},
});

export default styles;

export function SearchButton(props: TouchableOpacityProps) {
	return (
		<TouchableOpacity {...props}>
			<View style={styles.searchContainer}>
				<Text style={styles.searchText}>Pesquisar</Text>
				<Icon size={40} color={"#004071"} name="send" />
			</View>
		</TouchableOpacity>
	);
}

export function Input(props: TextInputProps) {
	return (
		<View
			style={{
				flexDirection: "row",
			}}
		>
			<TextInput
				{...props}
				placeholderTextColor="#575757"
				style={styles.input}
			/>
		</View>
	);
}
