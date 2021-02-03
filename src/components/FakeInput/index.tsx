import React from "react";
import { Text, TouchableOpacityProps, TouchableOpacity } from "react-native";

interface InputFake {
	placeholder: string;
	placeholderColor: string;
	placeholderSize?: number;
	value: string;
}
type FakeInputProps = TouchableOpacityProps & InputFake;
export default function FakeInput(props: FakeInputProps) {
	return (
		<TouchableOpacity {...props} activeOpacity={1.0} style={[props.style]}>
			{props.value === "" ? (
				<Text
					style={{
						color: props.placeholderColor,
						fontSize: props.placeholderSize || 13,
					}}
				>
					{props.placeholder}
				</Text>
			) : (
				<Text style={{ color: "black" }}>{props.value}</Text>
			)}
		</TouchableOpacity>
	);
}
