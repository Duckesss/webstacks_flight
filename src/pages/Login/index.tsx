import React from "react";
import { View, TouchableOpacity, Text, ActivityIndicator } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import Toast from "react-native-toast-message";
import { withFormik, FormikProps, Formik, FormikConfig } from "formik";
import api from "../../services/api";
import styles from "./styles";
import * as Yup from "yup";
import CustomInput from "../../components/CustomInput";
import {
	useNavigation,
	NavigationProp,
	ParamListBase,
} from "@react-navigation/native";

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

export default function () {
	const navigation = useNavigation();
	return (
		<Formik
			initialValues={{
				username: "",
				password: "",
				showPassword: false,
			}}
			onSubmit={async (values, formikBag) => {
				const id = Math.ceil(Math.random() * 100);
				try {
					await api.post("/posts", {
						headers: {
							"Content-type": "application/json",
						},
						body: {
							username: values.username,
							password: values.password,
							id,
						},
					});
					formikBag.setSubmitting(false);
					navigation.navigate("MeusVoos");
				} catch (err) {
					console.log(err);
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
