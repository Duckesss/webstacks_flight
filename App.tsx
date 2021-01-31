import React from "react";
import { Routes } from "./src/routes/routes";
import { SafeAreaProvider } from "react-native-safe-area-context";
import Toast from "react-native-toast-message";
export default function App() {
	console.log("===== APP INITIALIZED SUCCESSFULLY =====");
	return (
		<SafeAreaProvider>
			<Routes />
			<Toast ref={(ref: any) => Toast.setRef(ref)} />
		</SafeAreaProvider>
	);
}
