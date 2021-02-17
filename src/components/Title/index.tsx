import React from "react";
import { View, Text, TextProps, ViewProps } from "react-native";
import styles from "./styles";

export function Title(props: React.PropsWithChildren<TextProps>) {
	return (
		<View style={styles.container}>
			<Text style={[styles.text, props.style]}>{props.children}</Text>
		</View>
	);
}
export function TitleContainer(props: React.PropsWithChildren<ViewProps>){
	return (
		<View {...props} style={[styles.container,props.style]}>
			{props.children}
		</View>
	)
}
export function TitleText(props: React.PropsWithChildren<TextProps>){
	return (
		<Text style={[styles.text, props.style]}>{props.children}</Text>
	)
}