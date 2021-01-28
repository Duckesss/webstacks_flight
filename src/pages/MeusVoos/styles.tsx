import { StyleSheet, Dimensions } from "react-native";
const { width } = Dimensions.get("window");
const grid = 2;
const itemWidth = width / grid;

export const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
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
});
export const numberGrid = grid;
