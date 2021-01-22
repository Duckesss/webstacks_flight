import React from "react";
import { View, TextInput, Button } from "react-native";
import { withFormik, FormikProps, FormikErrors, Form, Field } from "formik";

import styles from "./styles";

interface FormValues {
	login: string;
	password: string;
}
type Props = FormikProps<FormValues>;

const render = (props: Props) => (
	<View style={styles.container}>
		<TextInput
			value={props.values.login}
			onChangeText={text => props.setFieldValue("login", text)}
		/>
		<TextInput
			value={props.values.password}
			onChangeText={text => props.setFieldValue("password", text)}
		/>
		<Button onPress={_ => props.handleSubmit()} title="Login" />
	</View>
);

export default withFormik<{}, FormValues>({
	mapPropsToValues: _ => ({ login: "", password: "" }),
	handleSubmit(values) {
		console.log(values);
	},
})(render);
