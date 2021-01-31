import React from "react";
import { View, Text, TextProps } from "react-native";
import styles from "./styles";

export default function Title(props: React.PropsWithChildren<TextProps>) {
	return (
		<View style={styles.container}>
			<Text style={[styles.text, props.style]}>{props.children}</Text>
		</View>
	);
}
