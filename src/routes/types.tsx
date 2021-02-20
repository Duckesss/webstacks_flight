import { RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { DrawerNavigationProp } from "@react-navigation/drawer";

type Pages = "Login" | "MeusVoos" | "BuscarVoos"

type RootStackParamList = {
	Login: undefined | {reset: boolean};
	MeusVoos: undefined | {reset: boolean};
	BuscarVoos: undefined | {reset: boolean};
	Sidebar: undefined | {reset: boolean};
};

type LoginProps = DrawerNavigationProp<RootStackParamList, "Login">;
type MeusVoosProps = DrawerNavigationProp<RootStackParamList, "MeusVoos">;
type BuscarVoosProps = DrawerNavigationProp<RootStackParamList, "BuscarVoos">;

type Navigation = LoginProps | MeusVoosProps | BuscarVoosProps; 

type NavigationProps = {
	navigation: Navigation
};
export type { NavigationProps, RootStackParamList, Pages, Navigation};
