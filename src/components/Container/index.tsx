import styled from "styled-components/native";
import React from "react";
import {
	View,
	KeyboardAvoidingView,
	Platform,
	ViewProps,
	KeyboardAvoidingViewProps,
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
