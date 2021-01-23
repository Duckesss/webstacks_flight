import { StyleSheet } from "react-native";

export default StyleSheet.create({
	container: {
		justifyContent: "center",
		alignItems: "center",
		flex: 1,
		padding: 70,
	},
	input: {
		borderWidth: 2,
		paddingHorizontal: 10,
		height: 50,
		backgroundColor: "#fff",
		borderTopWidth: 0,
		borderRightWidth: 0,
		borderLeftWidth: 0,
		borderColor: "#526888",
		borderRadius: 10,
		marginBottom: 10,
	},
	label: {
		backgroundColor: "#fff",
		paddingHorizontal: 5,
		borderRadius: 5,
	},
	button: {
		alignItems: "center",
		backgroundColor: "#DDDDDD",
		borderRadius: 5,
		padding: 10,
		paddingHorizontal: 40,
	},
});
