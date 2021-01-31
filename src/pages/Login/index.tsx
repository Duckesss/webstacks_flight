import React, { useState, useRef, useEffect } from "react";
import { Platform } from "react-native";
import Background from "../../components/Container";
import Loading from "../../components/Loading";
import Toast from "react-native-toast-message";
import { FormValues } from "./interfaces";
import api from "../../services/api";
import {
	Container,
	InputBackground,
	Input,
	Logo,
	SubmitButton,
	SubmitText,
	ErrorText,
} from "./styles";
import { LoginProps } from "./../../routes/types";

export default function Login({ route, navigation }: LoginProps) {
	const [campos, setCampos] = useState<FormValues>({
		username: {
			value: "",
			required: true,
		},
		password: {
			value: "",
			required: true,
		},
	});
	const [loading, setLoading] = useState<boolean>(false);

	return (
		<Background pointerEvents={loading ? "none" : "auto"}>
			<Container
				behavior={Platform.OS === "ios" ? "padding" : undefined}
				enabled
			>
				{loading && <Loading />}
				<Logo
					resizeMode="stretch"
					source={require("../../../assets/logo.png")}
				/>

				<InputBackground>
					<Input
						placeholder="Username"
						autoCorrect={false}
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
				</InputBackground>
				<InputBackground>
					<Input
						placeholder="Password"
						autoCorrect={false}
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
				</InputBackground>
				<SubmitButton onPress={() => submit(campos)}>
					<SubmitText>Login</SubmitText>
				</SubmitButton>
			</Container>
		</Background>
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
			setLoading(false);
			navigation.navigate("MeusVoos", { token });
		} catch (err) {
			setLoading(false);
			Toast.show({
				type: "error",
				text1: String(err.message || err || err.response?.data),
				topOffset: 50,
			});
		}
	}
}
