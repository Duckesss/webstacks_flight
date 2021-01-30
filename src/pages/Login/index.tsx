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
} from "./styles";
import { LoginProps } from "./../../routes/types";

interface FormValues {
	username: string;
	password: string;
}
export default function Login({ route, navigation }: LoginProps) {
	const [username, setUsername] = useState<string>("teste");
	const [password, setPassword] = useState<string>("teste@123");
	const [loading, setLoading] = useState<boolean>(false);
	async function submit({ username, password }: FormValues) {
		try {
			setLoading(true);
			const response = await api.post("/login", { username, password });
			console.log("RESPOSTA API", response.data);
			const { token } = response.data;
			setLoading(false);
			navigation.navigate("MeusVoos", { token });
		} catch (err) {
			console.log("ERRO");
			console.log(err.response?.data);
			Toast.show({
				type: "error",
				text1: String(err.message || err),
				topOffset: 50,
			});
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
						textContentType={"username"}
						onChangeText={text => setUsername(text)}
					/>
				</InputBackground>
				<InputBackground>
					<Input
						placeholder="Password"
						autoCorrect={false}
						autoCapitalize="none"
						textContentType={"password"}
						secureTextEntry={true}
						value={password}
						onChangeText={text => setPassword(text)}
					/>
				</InputBackground>

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
