import styled from "styled-components/native";
import { StyleSheet, Dimensions } from "react-native";
const { width } = Dimensions.get("window");
const numberGrid = 2;
const itemWidth = width / numberGrid;

export const Container = styled.View`
	flex: 1;
`;

export const Title = styled.Text`
	padding: 20px;
	font-size: 30px;
	align-self: center;
`;
export const DefaultText = styled.Text`
	text-align: center;
	font-size: 40px;
	color: black;
	opacity: 0.5;
`;
export const LinkText = styled.Text`
	font-size: 20px;
	color: blue;
	text-align: center;
	opacity: 0.5;
`;
export const Link = styled.TouchableOpacity``;
export const ListItem = styled.Text`
	border: 1px solid black;
	color: black;
	width: ${itemWidth}px;
	height: ${itemWidth}px;
	padding: 30px;
	flex: 1;
`;
export const styles = StyleSheet.create({
	listItem: {
		borderWidth: 1,
		borderColor: "black",
		borderStyle: "solid",
		shadowColor: "black",
		shadowOpacity: 0.6,
		color: "black",
		width: itemWidth,
		height: itemWidth,
		padding: 30,
		flex: 1,
	},
	containerSemVoos: {
		flex: 1,
	},
	textContainer: {
		flex: 1,
	},
	defaultText: {
		textAlign: "center",
		fontSize: 40,
		color: "black",
		opacity: 0.5,
	},
});

export const gridNumber = numberGrid;
