import { StackNavigationProp } from "@react-navigation/stack";

type RootStackParamList = {
	Login: undefined;
	MeusVoos: undefined;
	BuscarVoos: undefined;
};

type LoginProps = StackNavigationProp<RootStackParamList, "Login">;
type MeusVoosProps = StackNavigationProp<RootStackParamList, "MeusVoos">;
type BuscarVoosProps = StackNavigationProp<RootStackParamList, "BuscarVoos">;
type NavigationProps = {
	navigation: LoginProps | MeusVoosProps | BuscarVoosProps;
};
export type { NavigationProps, RootStackParamList };
