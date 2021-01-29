import React from "react";
import { View, TouchableOpacity, Text, ActivityIndicator } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import Toast from "react-native-toast-message";
import { FormikProps, Formik } from "formik";
import api from "../../services/api";
import styles from "./styles";
import * as Yup from "yup";
import CustomInput from "../../components/CustomInput";
import { LoginProps } from "./../../routes/types";

interface FormValues {
	username: string;
	password: string;
}
interface ownProps {
	showPassword: boolean;
}

type Props = ownProps & FormValues;

const render = (props: FormikProps<Props>) => {
	return (
		<View style={styles.container}>
			<Toast ref={ref => Toast.setRef(ref)} />
			{props.isSubmitting && (
				<ActivityIndicator
					style={styles.loading}
					color="#6699ff"
					size="large"
				/>
			)}
			<CustomInput
				value={props.values.username}
				label={"Username"}
				onChange={text => props.setFieldValue("username", text)}
			/>
			{props.errors.username && (
				<Text style={styles.errorLabel}>{props.errors.username}</Text>
			)}
			<CustomInput
				value={props.values.password}
				label={"Password"}
				hidePassword={<FontAwesome5 size={15} name="eye-slash" />}
				showPassword={<FontAwesome5 size={15} name="eye" />}
				togglePassword={props.values.showPassword}
				isPassword={true}
				onChange={text => props.setFieldValue("password", text)}
			/>
			{props.errors.password && (
				<Text style={styles.errorLabel}>{props.errors.password}</Text>
			)}
			<TouchableOpacity
				style={{ ...styles.button }}
				onPress={async _ => {
					props.handleSubmit();
				}}
			>
				<Text>Login</Text>
			</TouchableOpacity>
		</View>
	);
};

export default function Login({ route, navigation }: LoginProps) {
	return (
		<Formik
			initialValues={{
				username: "admin",
				password: "admin@123",
				showPassword: false,
			}}
			onSubmit={async (values, formikBag) => {
				try {
					const response = await api.post("/login", {
						username: values.username,
						password: values.password,
					});
					console.log("RESPOSTA API", response.data);
					const { token } = response.data;
					formikBag.setSubmitting(false);
					navigation.navigate("MeusVoos", { token });
				} catch (err) {
					console.log("ERRO");
					console.log(err.response?.data);
					formikBag.setSubmitting(false);
					Toast.show({
						type: "error",
						text1: String(err.message || err),
						topOffset: 50,
					});
				}
			}}
			validationSchema={Yup.object().shape({
				username: Yup.string().required(
					"Username é um campo obrigatório."
				),
				password: Yup.string().required(
					"Password é um campo obrigatório."
				),
			})}
		>
			{(props: FormikProps<Props>) => render(props)}
		</Formik>
	);
}
