import React from "react";
import {
	View,
	ViewProps,
} from "react-native";
import styles from "./styles";

export function Container(props: React.PropsWithChildren<ViewProps>) {
	return (
		<View style={styles.background}>
			<View style={[styles.container, props.style]}>
				{props.children}
			</View>
		</View>
	);
}
