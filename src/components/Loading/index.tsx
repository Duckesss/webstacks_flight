import React from "react";
import { LoadingContainer } from "./styles";
import { ActivityIndicator } from "react-native";
export default () => (
	<LoadingContainer>
		<ActivityIndicator color="white" size="large" />
	</LoadingContainer>
);
