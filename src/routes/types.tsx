import { StackNavigationProp } from "@react-navigation/stack";
import { RouteProp } from "@react-navigation/native";

type RootStackParamList = {
	Login: undefined;
	MeusVoos: { token: string };
	BuscarVoos: { token: string };
	PesquisarVoos: { token: string };
};

type LoginScreenRouteProp = RouteProp<RootStackParamList, "Login">;
type LoginScreenNavigationProp = StackNavigationProp<
	RootStackParamList,
	"Login"
>;
type LoginProps = {
	navigation: LoginScreenNavigationProp;
	route: LoginScreenRouteProp;
};

type MeusVoosScreenRouteProp = RouteProp<RootStackParamList, "MeusVoos">;
type MeusVoosScreenNavigationProp = StackNavigationProp<
	RootStackParamList,
	"MeusVoos"
>;
type MeusVoosProps = {
	navigation: MeusVoosScreenNavigationProp;
	route: MeusVoosScreenRouteProp;
};

type BuscarVoosScreenRouteProp = RouteProp<RootStackParamList, "BuscarVoos">;
type BuscarVoosScreenNavigationProp = StackNavigationProp<
	RootStackParamList,
	"BuscarVoos"
>;
type BuscarVoosProps = {
	navigation: BuscarVoosScreenNavigationProp;
	route: BuscarVoosScreenRouteProp;
};

export type { MeusVoosProps, RootStackParamList, LoginProps, BuscarVoosProps };
