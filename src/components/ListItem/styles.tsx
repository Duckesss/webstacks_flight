import { StyleSheet, Dimensions } from "react-native";
const { width } = Dimensions.get("window");
const numberGrid = 2;
const itemWidth = width / numberGrid;

export default StyleSheet.create({
	container: {
		borderWidth: 1,
		borderColor: "#b8b8b8",
		width: itemWidth,
		height: itemWidth,
		padding: 15,
		flex: 1,
		alignItems:"flex-end",
		justifyContent: "flex-end",
	},
	text: {
	},
});

