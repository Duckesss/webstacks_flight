import React from "react";
import styled from "styled-components/native";
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

export const LoginContainer = styled.KeyboardAvoidingView`
	flex: 1;
	align-items: center;
	justify-content: center;
`;

export const ErrorText = styled.Text`
	color: red;
	margin: -10px 0px 20px 0px;
	font-size: 16px;
`;
export const SubmitButton = styled.TouchableOpacity`
	align-items: center;
	justify-content: center;
	background-color: #004071;
	width: ${contentWidth - 30}%;
	height: 45px;
	border-radius: ${borderRadius}px;
	margin-top: 10px;
`;

export const SubmitText = styled.Text`
	font-size: 20px;
	color: #fff;
`;

export const Logo = styled.Image`
	width: 300px;
	height: 160px;
	top: -70px;
	margin-bottom: -10px;
`;
