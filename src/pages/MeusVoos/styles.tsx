import styled from "styled-components/native";
import { StyleSheet, Dimensions } from "react-native";
const { width } = Dimensions.get("window");
const numberGrid = 2;
const itemWidth = width / numberGrid;

export default StyleSheet.create({
	container: {
		marginTop: 50
	}
})

export const Container = styled.View`
	flex: 1;
	padding: 30px;
`;

export const DefaultText = styled.Text`
	text-align: center;
	font-size: 40px;
	color: white;
	opacity: 0.8;
`;
export const LinkText = styled.Text`
	font-size: 20px;
	color: #9ec5e2;
	text-align: center;
	opacity: 0.5;
`;
export const Link = styled.TouchableOpacity``;
export const ListItem = styled.Text`
	border: 1px solid #b8b8b8;
	color: #b3b3b3;
	width: ${itemWidth}px;
	height: ${itemWidth}px;
	padding: 30px;
	flex: 1;
`;

export const gridNumber = numberGrid;
