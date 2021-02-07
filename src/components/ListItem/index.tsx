import React from "react";
import { View, Text, ViewProps } from "react-native";
import styles from "./styles";

export default function ListItem(props: React.PropsWithChildren<ViewProps>) {
	return (
		<View style={styles.container}>
			{props.children}
		</View>
	);
}
