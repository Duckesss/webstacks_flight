import React, { useState } from "react";
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

// const render = (props: FormikProps<Props>) => {
// 	return (
// 		<Background>
// 			<Container>
// 				<Toast ref={ref => Toast.setRef(ref)} />
// 				{props.isSubmitting && (
// 					<ActivityIndicator
// 						style={styles.loading}
// 						color="#6699ff"
// 						size="large"
// 					/>
// 				)}
// 				<CustomInput
// 					value={props.values.username}
// 					label={"Username"}
// 					onChange={text => props.setFieldValue("username", text)}
// 				/>
// 				{props.errors.username && (
// 					<Text style={styles.errorLabel}>
// 						{props.errors.username}
// 					</Text>
// 				)}
// 				<CustomInput
// 					value={props.values.password}
// 					label={"Password"}
// 					hidePassword={<FontAwesome5 size={15} name="eye-slash" />}
// 					showPassword={<FontAwesome5 size={15} name="eye" />}
// 					togglePassword={props.values.showPassword}
// 					isPassword={true}
// 					onChange={text => props.setFieldValue("password", text)}
// 				/>
// 				{props.errors.password && (
// 					<Text style={styles.errorLabel}>
// 						{props.errors.password}
// 					</Text>
// 				)}
// 				<TouchableOpacity
// 					style={{ ...styles.button }}
// 					onPress={async _ => {
// 						props.handleSubmit();
// 					}}
// 				>
// 					<Text>Login</Text>
// 				</TouchableOpacity>
// 			</Container>
// 		</Background>
// 	);
// };

// export default function Login({ route, navigation }: LoginProps) {
// 	return (
// 		<Formik
// 			initialValues={{
// 				username: "admin",
// 				password: "admin@123",
// 				showPassword: false,
// 			}}
// 			onSubmit={async (values, formikBag) => {
// 				try {
// 					const response = await api.post("/login", {
// 						username: values.username,
// 						password: values.password,
// 					});
// 					console.log("RESPOSTA API", response.data);
// 					const { token } = response.data;
// 					formikBag.setSubmitting(false);
// 					navigation.navigate("MeusVoos", { token });
// 				} catch (err) {
// 					console.log("ERRO");
// 					console.log(err.response?.data);
// 					formikBag.setSubmitting(false);
// 					Toast.show({
// 						type: "error",
// 						text1: String(err.message || err),
// 						topOffset: 50,
// 					});
// 				}
// 			}}
// 			validationSchema={Yup.object().shape({
// 				username: Yup.string().required(
// 					"Username é um campo obrigatório."
// 				),
// 				password: Yup.string().required(
// 					"Password é um campo obrigatório."
// 				),
// 			})}
// 		>
// 			{(props: FormikProps<Props>) => render(props)}
// 		</Formik>
// 	);
// }

export default function Login({ route, navigation }: LoginProps) {
	const [username, setUsername] = useState<string>("");
	const [password, setPassword] = useState<string>("");
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
			<Container>
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
