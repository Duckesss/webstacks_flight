import React, { useState, useEffect } from "react";
import { Container } from "./styles";
import { ActivityIndicator } from "react-native";
export default () => (
	<Container>
		<ActivityIndicator color="white" size="large" />
	</Container>
);
