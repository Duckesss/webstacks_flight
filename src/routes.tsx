import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

const AppStack = createStackNavigator();

import Login from "./pages/Login";
// import { BuscarVoos } from "./pages/BuscarVoos";
// import { MeusVoos } from "./pages/MeusVoos";
// import { Pagamento } from "./pages/Pagamento";
export class Routes extends React.Component {
	render() {
		return (
			<NavigationContainer>
				<AppStack.Navigator screenOptions={{ headerShown: false }}>
					<AppStack.Screen name="Login" component={Login} />
					{/* <AppStack.Screen name="BuscarVoos" component={BuscarVoos} />
				<AppStack.Screen name="MeusVoos" component={MeusVoos} />
				<AppStack.Screen name="Pagamento" component={Pagamento} /> */}
				</AppStack.Navigator>
			</NavigationContainer>
		);
	}
}
