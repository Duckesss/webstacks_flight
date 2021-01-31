import React from "react";
import { TouchableOpacity, TouchableOpacityProps } from "react-native";
import styles from "./styles";

export default function FloatingButton(
	props: React.PropsWithChildren<TouchableOpacityProps>
) {
	return (
		<TouchableOpacity
			{...props}
			style={[styles.floatingButton, props.style]}
		>
			{props.children}
		</TouchableOpacity>
	);
}
