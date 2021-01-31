import styled from "styled-components/native";
import { StyleSheet, Dimensions, View } from "react-native";
const { width } = Dimensions.get("window");
const numberGrid = 2;
export const FloatingButton = styled.TouchableOpacity`
	position: absolute;
	width: 65px;
	height: 65px;
	align-items: center;
	justify-content: center;
	border-radius: 50px;
	right: 30px;
	bottom: 30px;
	background-color: white;
`;
export const gridNumber = numberGrid;
