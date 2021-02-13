import styled from "styled-components/native";
import { StyleSheet, Dimensions } from "react-native";
const { width } = Dimensions.get("window");
const numberGrid = 2;
const itemWidth = width / numberGrid;

export default StyleSheet.create({
	container: {
		marginTop: 50
	},
	content:{
		flex:1,
	},
	background:{
		// borderColor: "#b8b8b8",
		borderColor: "#5f5f5f",
		borderBottomWidth:1,
		marginBottom:20,
		padding: 15,
		flex: 1,
	},
	titleText:{
		color: "white",
		flexDirection:"row",
		fontSize: 17,
		justifyContent:"flex-start",
		alignItems:"flex-start",
		marginRight:"auto"
	},
	title:{
		flexDirection:"row",
	},
	body:{
		marginTop:20,
	},
	botaoComprar:{
		marginLeft:"auto"
	},
	lastItem:{
		flexDirection:"row",
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