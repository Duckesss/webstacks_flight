import React from "react";
import { TouchableOpacity, TouchableOpacityProps, View } from "react-native";
import styles from "./styles";

export function FloatingButton(
	props: React.PropsWithChildren<TouchableOpacityProps>
) {
	return (
		<TouchableOpacity activeOpacity={0.7}
			{...props}
			style={[styles.floatingButton, props.style]}
		>
			{props.children}
		</TouchableOpacity>
	);
}
