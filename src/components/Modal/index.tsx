import React from "react";
import { Modal, ModalProps, View } from "react-native";
import styles from "./styles";

interface myModalProps {
	position: "center" | "bottom" | "top";
}
type Props = React.PropsWithChildren<ModalProps> & myModalProps;

export default function FloatingButton(props: Props) {
	return (
		<Modal {...props} style={props.style}>
			<View style={styles[props.position]}>
				<View style={[styles.modalView]}>{props.children}</View>
			</View>
		</Modal>
	);
}
