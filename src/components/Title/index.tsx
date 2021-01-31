import React from "react";
import { View, Text } from "react-native";
import styles from "./styles";

export default function Title(props: React.PropsWithChildren<any>) {
	return (
		<View style={styles.container}>
			<Text style={styles.text}>{props.children}</Text>
		</View>
	);
}
