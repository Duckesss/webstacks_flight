import { StackNavigationProp } from "@react-navigation/stack";
import { RouteProp } from "@react-navigation/native";

type RootStackParamList = {
	Login: undefined;
	MeusVoos: { token: string };
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

export type { MeusVoosProps, RootStackParamList, LoginProps };
