import styled from "styled-components/native";
import React, { Component } from "react";
import { View, Text } from "react-native";
import styles from "./styles";

export default function Container(props: React.PropsWithChildren<any>) {
	return (
		<View style={styles.background}>
			<View style={styles.container}>{props.children}</View>
		</View>
	);
}
