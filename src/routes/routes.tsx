import React from "react";
import { StatusBar } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { RootStackParamList } from "./types";
import { LinearGradient } from "expo-linear-gradient";
import { SafeAreaView } from "react-native-safe-area-context";
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
						<AppStack.Navigator
							initialRouteName="Login"
							screenOptions={{ headerShown: false }}
						>
							<AppStack.Screen name="Login" component={Login} />
							<AppStack.Screen
								name="MeusVoos"
								initialParams={{ token: "" }}
								component={MeusVoos}
							/>
							<AppStack.Screen
								name="BuscarVoos"
								initialParams={{ token: "" }}
								component={BuscarVoos}
							/>
						</AppStack.Navigator>
					</NavigationContainer>
				</SafeAreaView>
			</>
		);
	}
}
