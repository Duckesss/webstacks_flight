import { RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";

type RootStackParamList = {
	Login: undefined;
	MeusVoos: undefined;
	BuscarVoos: {
		modal: boolean
	};
};

type LoginProps = StackNavigationProp<RootStackParamList, "Login">;
type MeusVoosProps = StackNavigationProp<RootStackParamList, "MeusVoos">;
type BuscarVoosProps = StackNavigationProp<RootStackParamList, "BuscarVoos">;
type NavigationProps = {
	navigation: LoginProps | MeusVoosProps | BuscarVoosProps;
	route: RouteProp<RootStackParamList,"BuscarVoos">
};
export type { NavigationProps, RootStackParamList };
