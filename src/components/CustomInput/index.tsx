import React from "react";
import { FloatingLabelInput } from "react-native-floating-label-input";
import styles from "./styles";
interface FormInput {
	value: string;
	label: string;
	onChange(param: any): any;
	hidePassword?: JSX.Element;
	showPassword?: JSX.Element;
	isPassword?: boolean;
	togglePassword?: boolean;
}

type Props = FormInput;

const CustomInput = (props: Props) => {
	return (
		<FloatingLabelInput
			containerStyles={styles.input}
			labelStyles={styles.label}
			customLabelStyles={{ fontSizeFocused: 10 }}
			value={props.value}
			label={props.label}
			onChangeText={props.onChange}
			isPassword={props.isPassword || false}
			togglePassword={props.togglePassword}
			customHidePasswordComponent={props.hidePassword}
			customShowPasswordComponent={props.showPassword}
		/>
	);
};

export default CustomInput;
