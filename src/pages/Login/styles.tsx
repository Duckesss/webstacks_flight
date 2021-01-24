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
	loading: {
		backgroundColor: "rgba(0,0,0,0.3)",
		position: "absolute",
		top: 0,
		right: 0,
		bottom: 0,
		left: 0,
		zIndex: 1,
	},
	icon: {
		fontSize: 30,
		position: "absolute",
		zIndex: 1,
		width: 500,
		color: "green",
	},
	errorLabel: {
		marginTop: -5,
		marginBottom: 10,
		color: "#C94141",
	},
	button: {
		alignItems: "center",
		backgroundColor: "#DDDDDD",
		borderRadius: 5,
		padding: 10,
		paddingHorizontal: 40,
	},
});
