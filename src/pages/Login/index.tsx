import React from "react";
import { View, TextInput, TouchableOpacity, Text, Button } from "react-native";
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
			style={{ ...styles.input }}
			value={props.values.login}
			onChangeText={text => props.setFieldValue("login", text)}
		/>
		<TextInput
			style={{ ...styles.input, ...styles.distance }}
			value={props.values.password}
			onChangeText={text => props.setFieldValue("password", text)}
		/>
		<TouchableOpacity
			style={{ ...styles.distance, ...styles.button }}
			onPress={_ => props.handleSubmit()}
		>
			<Text>Login</Text>
		</TouchableOpacity>
	</View>
);

export default withFormik<{}, FormValues>({
	mapPropsToValues: _ => ({ login: "", password: "" }),
	handleSubmit(values) {
		console.log(values);
	},
})(render);
