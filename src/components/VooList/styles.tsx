import styled from "styled-components/native";
import { StyleSheet, Dimensions } from "react-native";
const { width } = Dimensions.get("window");
const numberGrid = 2;
const itemWidth = width / numberGrid;

export default StyleSheet.create({
	container: {
		marginTop: 50
	},
	background:{
		borderWidth: 1,
		borderColor: "#b8b8b8",
		width: itemWidth,
		height: itemWidth,
		padding: 15,
		flex: 1,
	},
	title:{
		justifyContent:"center",
		alignItems:"center",
	},
	content:{
		justifyContent: "flex-end",
		alignItems:"flex-end",
		flex:1
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