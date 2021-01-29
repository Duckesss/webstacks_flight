import React from "react";
import { Routes } from "./src/routes/routes";
import { SafeAreaProvider } from "react-native-safe-area-context";
export default function App() {
	console.log("===== APP INITIALIZED SUCCESSFULLY =====");
	return (
		<SafeAreaProvider>
			<Routes />
		</SafeAreaProvider>
	);
}
