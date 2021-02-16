import { RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { DrawerNavigationProp } from "@react-navigation/drawer";

type Pages = "Login" | "MeusVoos" | "BuscarVoos"

type RootStackParamList = {
	Login: undefined;
	MeusVoos: undefined;
	BuscarVoos: undefined;
	Sidebar: undefined;
};

type LoginProps = DrawerNavigationProp<RootStackParamList, "Login">;
type MeusVoosProps = DrawerNavigationProp<RootStackParamList, "MeusVoos">;
type BuscarVoosProps = DrawerNavigationProp<RootStackParamList, "BuscarVoos">;
type NavigationProps = {
	navigation: LoginProps | MeusVoosProps | BuscarVoosProps;
};
export type { NavigationProps, RootStackParamList, Pages};
