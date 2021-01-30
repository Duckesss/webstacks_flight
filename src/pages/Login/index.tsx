import React, { useState } from "react";
import { Platform } from "react-native";
import Background from "../../components/Background";
import Loading from "../../components/Loading";
import Toast from "react-native-toast-message";
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

interface FormValues {
	username: string;
	password: string;
}
interface Errors {
	usernameError: string;
	passwordError: string;
}
enum ErrorString {
	required = "Este campo é obrigatório.",
}
export default function Login({ route, navigation }: LoginProps) {
	const [username, setUsername] = useState<string>("");
	const [errors, setErrors] = useState<Errors>({
		usernameError: "",
		passwordError: "",
	});
	const [password, setPassword] = useState<string>("");
	const [loading, setLoading] = useState<boolean>(false);
	async function submit({ username, password }: FormValues) {
		try {
			const erroValidacao = Object.values(errors).some(
				errString => errString === ""
			);
			if (erroValidacao)
				throw "Existem campos com erro. Verifique o texto em vermelho.";
			setLoading(true);
			const response = await api.post("/login", { username, password });
			console.log("RESPOSTA API", response.data);
			const { token } = response.data;
			setLoading(false);
			navigation.navigate("MeusVoos", { token });
		} catch (err) {
			setLoading(false);
			console.log("DEU ERRO");
			// Toast.show({
			// 	type: "error",
			// 	text1: String(err.message || err || err.response?.data),
			// 	topOffset: 50,
			// });
		}
	}

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
						value={username}
						onBlur={() => {
							username === ""
								? setErrors({
										...errors,
										usernameError: ErrorString.required,
								  })
								: setErrors({
										...errors,
										usernameError: "",
								  });
						}}
						textContentType={"username"}
						onChangeText={text => setUsername(text)}
					/>
				</InputBackground>
				{errors.usernameError !== "" && (
					<ErrorText>{errors.usernameError}</ErrorText>
				)}
				<InputBackground>
					<Input
						placeholder="Password"
						autoCorrect={false}
						autoCapitalize="none"
						textContentType={"password"}
						secureTextEntry={true}
						onBlur={() => {
							password === ""
								? setErrors({
										...errors,
										passwordError: ErrorString.required,
								  })
								: setErrors({
										...errors,
										passwordError: "",
								  });
						}}
						value={password}
						onChangeText={text => setPassword(text)}
					/>
				</InputBackground>
				{errors.passwordError !== "" && (
					<ErrorText>{errors.passwordError}</ErrorText>
				)}

				<SubmitButton
					onPress={_ => {
						submit({ username, password });
					}}
				>
					<SubmitText>Login</SubmitText>
				</SubmitButton>
			</Container>
		</Background>
	);
}
