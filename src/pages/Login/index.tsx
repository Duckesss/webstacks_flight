import React from "react";
import { View, TouchableOpacity, Text } from "react-native";
import { FloatingLabelInput } from "react-native-floating-label-input";
import { withFormik, FormikProps, FormikErrors, Form, Field } from "formik";

import styles from "./styles";

interface FormValues {
	login: string;
	password: string;
}
type Props = FormikProps<FormValues>;

const render = (props: Props) => (
	<View style={styles.container}>
		<FloatingLabelInput
			containerStyles={styles.input}
			labelStyles={styles.label}
			customLabelStyles={{ fontSizeFocused: 10 }}
			value={props.values.login}
			label="Login"
			onChangeText={text => props.setFieldValue("login", text)}
		/>
		<FloatingLabelInput
			containerStyles={styles.input}
			labelStyles={styles.label}
			value={props.values.password}
			label="Password"
			onChangeText={text => props.setFieldValue("password", text)}
		/>
		<TouchableOpacity
			style={{ ...styles.button }}
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
