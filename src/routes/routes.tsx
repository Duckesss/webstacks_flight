import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { RootStackParamList } from "./types";
import { SafeAreaView } from "react-native-safe-area-context";
const AppStack = createStackNavigator<RootStackParamList>();
import Login from "../pages/Login";
import MeusVoos from "../pages/MeusVoos";
// import { BuscarVoos } from "./pages/BuscarVoos";
// import { Pagamento } from "./pages/Pagamento";
export class Routes extends React.Component {
	render() {
		return (
			<SafeAreaView style={{ flex: 1 }}>
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
					</AppStack.Navigator>
				</NavigationContainer>
			</SafeAreaView>
		);
	}
}
