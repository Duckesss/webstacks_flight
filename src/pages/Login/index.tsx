import React, { PropsWithChildren, useState } from "react";
import { Loading, Container } from "../../components";
import AsyncStorage from "@react-native-async-storage/async-storage";
import api from "../../services";
import styles, { Input } from "./styles";
import { NavigationProps } from "./../../routes/types";
import { FormValues } from "./interfaces"
import { TouchableOpacity, TouchableOpacityProps, Text, Image } from "react-native";

function SubmitButton(props : PropsWithChildren<TouchableOpacityProps>){
	return (
		<TouchableOpacity {...props} style={styles.submitButton}>
			{props.children}
		</TouchableOpacity>
	)
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
			<Image style={styles.logo}
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
				<Text style={styles.submitText}>
					Login
				</Text>
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
		}
	}
}
