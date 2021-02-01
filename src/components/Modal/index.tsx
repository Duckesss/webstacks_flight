import React from "react";
import { Modal, ModalBaseProps, View, ViewProps } from "react-native";
import styles from "./styles";

interface myModalProps {
	position: "center" | "bottom" | "top";
	containerStyle?: ViewProps;
}
type Props = React.PropsWithChildren<ModalBaseProps> & myModalProps;

export default function FloatingButton(props: Props) {
	return (
		<Modal {...props}>
			<View style={styles[props.position]}>
				<View style={[styles.modalView, props.containerStyle]}>
					{props.children}
				</View>
			</View>
		</Modal>
	);
}
