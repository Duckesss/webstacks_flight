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
	title: {
		padding: 20,
		fontSize: 30,
		alignSelf: "center",
	},
});
export const numberGrid = grid;
