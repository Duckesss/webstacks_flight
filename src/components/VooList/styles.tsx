import { StyleSheet } from "react-native";
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
	titleContainer:{
		flexDirection:"row",
		flexWrap:"wrap",
		justifyContent:"flex-start",
		alignItems:"flex-start",
		marginRight:"auto",
	},
	titleText:{
		color: "white",
		fontSize: 17,
		width:"100%"
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

