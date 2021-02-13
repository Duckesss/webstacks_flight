import React from "react";
import { View, Text, TextProps } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { PickerProps } from "@react-native-picker/picker/typings/Picker";

interface SelectProps {
	labelText?: string;
	labelProps?: TextProps;
}
type Props = React.PropsWithChildren<PickerProps> & SelectProps;

export function Select(props: Props) {
	return (
		<View>
			{props.labelText && (
				<Text {...props.labelProps}>{props.labelText}</Text>
			)}
			<Picker {...props}>{props.children}</Picker>
		</View>
	);
}
