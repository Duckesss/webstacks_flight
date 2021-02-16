import React from "react";
import { StatusBar, Text } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { RootStackParamList } from "./types";
import { SafeAreaView } from "react-native-safe-area-context";
import Icon from 'react-native-vector-icons/MaterialIcons'; 
import { createDrawerNavigator } from '@react-navigation/drawer';
const Drawer = createDrawerNavigator<RootStackParamList>();
const AppStack = createStackNavigator<RootStackParamList>();
import Login from "../pages/Login";
import MeusVoos from "../pages/MeusVoos";
import BuscarVoos from "../pages/BuscarVoos";
// import { Pagamento } from "./pages/Pagamento";
export class Routes extends React.Component {
	render() {
		return (
			<>
				<StatusBar barStyle="light-content" />
				<SafeAreaView style={{ flex: 0, backgroundColor: "#131313" }} />
				<SafeAreaView style={{ flex: 1, backgroundColor: "#131313" }}>
					<NavigationContainer>
						<Drawer.Navigator
							initialRouteName="Login"
							screenOptions={{
								headerShown: false,
							}}
							drawerStyle={{
								backgroundColor:"#131313"
							}}
						>
							<Drawer.Screen
								name="Login" 
								component={Login} 
								options={{
									drawerIcon: (props) => (
										(<Icon size={35} color={"white"} name={"account-box"}/>)
									),
									drawerLabel: (props) => (
										<Text style={{color:"white"}}>Login</Text>
									)
								}}
							/>
							<Drawer.Screen
								name="MeusVoos"
								component={MeusVoos}
								options={{
									drawerIcon: (props) => (
										(<Icon size={35} color={"white"} name={"book-online"}/>)
									),
									drawerLabel: (props) => (
										<Text style={{color:"white"}}>Meus Voos</Text>
									)
								}}
							/>
							<Drawer.Screen
								name="BuscarVoos"
								component={BuscarVoos}
								options={{
									drawerIcon: (props) => (
										(<Icon size={35} color={"white"} name={"flight"}/>)
									),
									drawerLabel: (props) => (
										<Text style={{color:"white"}}>Buscar Voos</Text>
									)
								}}
							/>
						</Drawer.Navigator>
					</NavigationContainer>
				</SafeAreaView>
			</>
		);
	}
}
