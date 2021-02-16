import { RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";

type Pages = "Login" | "MeusVoos" | "BuscarVoos"

type RootStackParamList = {
	Login: undefined;
	MeusVoos: undefined;
	BuscarVoos: undefined;
	Sidebar: undefined;
};

type LoginProps = StackNavigationProp<RootStackParamList, "Login">;
type MeusVoosProps = StackNavigationProp<RootStackParamList, "MeusVoos">;
type BuscarVoosProps = StackNavigationProp<RootStackParamList, "BuscarVoos">;
type NavigationProps = {
	navigation: LoginProps | MeusVoosProps | BuscarVoosProps;
};
export type { NavigationProps, RootStackParamList, Pages};
