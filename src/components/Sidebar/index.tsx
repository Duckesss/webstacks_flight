import React from "react";
import { View, TouchableWithoutFeedback } from "react-native";
import { NavigationProps } from "./../../routes/types";
import Icon from 'react-native-vector-icons/MaterialIcons'; 

type Props = NavigationProps;
export function Sidebar(props: Props) {
	return (
		<View
			hitSlop={{top: 50, bottom: 50, left: 50, right: 50}}
		>
			<TouchableWithoutFeedback
				onPress={props.navigation.toggleDrawer}
			>
				{(<Icon size={40} color={"white"} name={"menu"}/>)}
			</TouchableWithoutFeedback>
		</View>
	);
}
