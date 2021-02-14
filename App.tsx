import React from "react";
import { Routes } from "./src/routes/routes";
import { KeyboardAvoidingView, Platform } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
export default function App() {
	console.log("===== APP INITIALIZED SUCCESSFULLY =====");
	return (
		<KeyboardAvoidingView
			behavior={Platform.OS === "ios" ? "padding" : "height"}
			enabled
			style={{ flex: 1 }}
		>
			<SafeAreaProvider>
				<Routes />
			</SafeAreaProvider>
		</KeyboardAvoidingView>
	);
}