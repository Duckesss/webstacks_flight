import React from "react";
import { Text, TextProps } from "react-native";
import styles from "./styles";

type align = "flex-end" | "flex-start" | "center"

interface PageCountProps{
	totalPages: number;
	page: number
	alignment?: align
}
type Props = React.PropsWithChildren<TextProps> & PageCountProps
export function PageCount(props: Props){
	return (
		<Text
			style={[styles.mainStyle,{alignSelf: props.alignment || "flex-end"}]}
		>
			Página {props.page} de {props.totalPages || ''}
		</Text>
	);
}