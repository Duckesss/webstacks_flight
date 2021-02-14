import { StyleSheet } from "react-native";

export default StyleSheet.create({
	container: {
		marginTop: 50
	},
	title:{
		justifyContent:"center",
		alignItems:"center",
	},
	content:{
		justifyContent: "flex-end",
		alignItems:"flex-end",
		flex:1
	},
	defaultText:{
		textAlign:"center",
		fontSize:40,
		color:"white",
		opacity:0.8
	},
	linkText:{
		fontSize:20,
		color:"#9ec5e2",
		textAlign:"center",
		opacity:0.5
	}
})