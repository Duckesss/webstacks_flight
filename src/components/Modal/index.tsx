import React from "react";
import { Modal, ModalProps, View, StyleProp, ViewStyle } from "react-native";
import styles from "./styles";

interface myModalProps {
	position: "center" | "bottom" | "top";
	containerStyle?: StyleProp<ViewStyle>
}
type Props = React.PropsWithChildren<ModalProps> & myModalProps;

export function Modal_(props: Props) {
	return (
		<Modal {...props} transparent={true} style={props.style}>
			<View style={[styles[props.position],styles.background]}>
				<View style={[styles.modalView, props.containerStyle ?? {}]}>{props.children}</View>
			</View>
		</Modal>
	);
}
