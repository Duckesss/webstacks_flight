import React, { useState } from "react";
import { Loading, Container } from "../../components";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Toast from "react-native-toast-message";
import api from "../../services";
import styles, { Input, Logo, SubmitButton, SubmitText } from "./styles";
import { NavigationProps } from "./../../routes/types";

export interface InputInterface {
	[index: string]: string | boolean | undefined;
	value: string;
	required?: boolean;
}

export interface FormValues {
	[index: string]: InputInterface;
	username: InputInterface;
	password: InputInterface;
}

export default function Login({ navigation }: NavigationProps) {
	const [campos, setCampos] = useState<FormValues>({
		username: {
			value: "admin",
			required: true,
		},
		password: {
			value: "admin@123",
			required: true,
		},
	});
	const [loading, setLoading] = useState<boolean>(false);
	return (
		<Container
			pointerEvents={loading ? "none" : "auto"}
			style={styles.center}
		>
			{loading && <Loading />}
			<Logo
				resizeMode="stretch"
				source={require("../../../assets/logo.png")}
			/>
			<Input
				placeholder="Username"
				autoCapitalize="none"
				value={campos.username.value}
				textContentType={"username"}
				onChangeText={(text: string) => {
					setCampos({
						...campos,
						username: {
							...campos.username,
							value: text,
						},
					});
				}}
			/>
			<Input
				placeholder="Password"
				autoCapitalize="none"
				textContentType={"password"}
				secureTextEntry={true}
				value={campos.password.value}
				onChangeText={(text: string) => {
					setCampos({
						...campos,
						password: {
							...campos.password,
							value: text,
						},
					});
				}}
			/>
			<SubmitButton onPress={() => submit(campos)}>
				<SubmitText>Login</SubmitText>
			</SubmitButton>
		</Container>
	);

	async function submit({ username, password }: FormValues) {
		try {
			if (username.value === "" || password.value === "")
				throw "Preencha ambos os campos!";
			setLoading(true);
			const response = await api.post("/login", {
				username: username.value,
				password: password.value,
			});
			const { token } = response.data;
			await AsyncStorage.setItem("@token", token);
			setLoading(false);
			navigation.navigate("MeusVoos");
		} catch (err) {
			setLoading(false);
			console.log(err.message || err || err.response?.data);
			Toast.show({
				type: "error",
				text1: String(err.message || err || err.response?.data),
				topOffset: 50,
			});
		}
	}
}
