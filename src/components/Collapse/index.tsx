import React, { ReactNode, useState } from "react";
import {
	TouchableOpacity,
	TouchableOpacityProps
} from "react-native";

interface CollapseI{
	onToggle?:(collapsed : boolean) => any
	header: ReactNode;
	body: ReactNode;
}
type Props = React.PropsWithChildren<TouchableOpacityProps> & CollapseI
export function Collapse(props: Props) {
	const [collapsed,setCollapsed] = useState<boolean>(true)
	return (
		<TouchableOpacity
			{...props} 
			onPress={() => {
				setCollapsed(!collapsed)
				props.onToggle && props.onToggle(collapsed)
			}}
		>
			{props.header}
			{!collapsed && props.body}
		</TouchableOpacity>
	);
}
