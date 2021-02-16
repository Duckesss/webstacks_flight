import React, { useState } from "react";
import { View, Text, TouchableWithoutFeedback, FlatList } from "react-native";
import { Overlay } from 'react-native-elements';
import { NavigationProps, Pages } from "./../../routes/types";
import Icon from 'react-native-vector-icons/MaterialIcons'; 
import styles from "./styles";

interface Page{
	title:string;
	route:Pages;
}

const pages : Page[] = [{
	title: "Login",
	route: "Login"
},{
	title: "Meus voos",
	route: "MeusVoos"
},{
	title: "Buscar voos",
	route: "BuscarVoos"
}]

type Props = NavigationProps;


export function Sidebar(props: Props) {
	const [open,setOpen] = useState<boolean>(false)
	function toggleOpen(){
		setOpen(!open)
	}
	return (
		<View>
			<TouchableWithoutFeedback onPress={toggleOpen}>
				{(<Icon size={40} color={"white"} name={"menu"}/>)}
			</TouchableWithoutFeedback>
			<Overlay
				isVisible={open}
				onBackdropPress={toggleOpen}
				overlayStyle={styles.overlay}
			>
				<View style={styles.drawerContainer}>
					<TouchableWithoutFeedback onPress={toggleOpen}>
						{(<Icon size={40} color={"white"} name={"keyboard-backspace"}/>)}
					</TouchableWithoutFeedback>
					<FlatList
						style={styles.listItem}
						data={pages}
						key={2}
						keyExtractor={(_, index) => String(index)}
						renderItem={page => (
							<TouchableWithoutFeedback
								onPress={() => {
									props.navigation.navigate(page.item.route)
									toggleOpen()
								}}
							>
								<Text style={styles.text}>
									{page.item.title}
								</Text>
							</TouchableWithoutFeedback>
						)}
					/>
				</View>
			</Overlay>
		</View>
	);
}
