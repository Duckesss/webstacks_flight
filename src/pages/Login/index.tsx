import React from "react";
import { View, TouchableOpacity, Text, ActivityIndicator } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import { FloatingLabelInput } from "react-native-floating-label-input";
import Toast from "react-native-toast-message";
import { withFormik, FormikProps } from "formik";
import api from "../../webservices/api";
import styles from "./styles";
import * as Yup from "yup";

interface FormValues {
	username: string;
	password: string;
}
interface ownProps {
	showPassword: boolean;
}

type Props = ownProps & FormValues;

const render = (props: FormikProps<Props>) => (
	<View style={styles.container}>
		<Toast ref={ref => Toast.setRef(ref)} />
		{props.isSubmitting && (
			<ActivityIndicator
				style={styles.loading}
				color="#6699ff"
				size="large"
			/>
		)}
		<FloatingLabelInput
			containerStyles={styles.input}
			labelStyles={styles.label}
			customLabelStyles={{ fontSizeFocused: 10 }}
			value={props.values.username}
			label="Username"
			onChangeText={text => props.setFieldValue("username", text)}
		/>
		{props.errors.username && (
			<Text style={styles.errorLabel}>{props.errors.username}</Text>
		)}
		<FloatingLabelInput
			containerStyles={styles.input}
			labelStyles={styles.label}
			value={props.values.password}
			isPassword
			togglePassword={props.values.showPassword}
			customHidePasswordComponent={
				<FontAwesome5 size={15} name="eye-slash" />
			}
			customShowPasswordComponent={<FontAwesome5 size={15} name="eye" />}
			customLabelStyles={{ fontSizeFocused: 10 }}
			label="Password"
			onChangeText={text => props.setFieldValue("password", text)}
		/>
		{props.errors.password && (
			<Text style={styles.errorLabel}>{props.errors.password}</Text>
		)}
		<TouchableOpacity
			style={{ ...styles.button }}
			onPress={_ => props.handleSubmit()}
		>
			<Text>Login</Text>
		</TouchableOpacity>
	</View>
);

export default withFormik<{}, Props>({
	mapPropsToValues: _ => ({
		username: "",
		password: "",
		showPassword: false,
	}),
	async handleSubmit(values, { setSubmitting }) {
		try {
			await api.post("/posts", {
				headers: {
					"Content-type": "application/json",
				},
				body: {
					username: values.username,
					password: values.password,
				},
			});
			setSubmitting(false);
			throw "Jonas";
		} catch (err) {
			setSubmitting(false);
			Toast.show({
				type: "error",
				text1: String(err.message || err),
				topOffset: 50,
			});
		}
	},
	validationSchema: Yup.object().shape({
		username: Yup.string().required("Username é um campo obrigatório."),
		password: Yup.string().required("Password é um campo obrigatório."),
	}),
})(render);
