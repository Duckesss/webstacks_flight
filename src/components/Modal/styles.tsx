import React from "react";
import { StyleSheet } from "react-native";

export default StyleSheet.create({
	center: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
	},
	bottom: {
		flex: 1,
		justifyContent: "flex-end",
		alignItems: "center",
	},
	top: {
		flex: 1,
		justifyContent: "flex-start",
		alignItems: "center",
	},
	modalView: {
		backgroundColor: "white",
		borderRadius: 20,
		padding: 50,
		height: 600,
		width: 400,
		alignItems: "center",
		shadowColor: "#000",
		shadowOffset: {
			width: 0,
			height: 2,
		},
		shadowOpacity: 0.25,
		shadowRadius: 3.84,
		elevation: 5,
	},
	textStyle: {
		color: "white",
		fontWeight: "bold",
		textAlign: "center",
	},
	modalText: {
		textAlign: "center",
	},
});
