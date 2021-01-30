import styled from "styled-components/native";

const contentWidth = 80;
const borderRadius = 7;

export const Container = styled.KeyboardAvoidingView`
	flex: 1;
	align-items: center;
	justify-content: center;
`;
export const InputBackground = styled.View`
	flex-direction: row;
`;
export const ErrorText = styled.Text`
	color: red;
	margin: -10px 0px 20px 0px;
	font-size: 16px;
`;
export const Input = styled.TextInput.attrs({
	placeholderTextColor: "#a8a8a8",
})`
	background: rgba(0, 0, 0, 0.2);
	width: ${contentWidth}%;
	font-size: 17px;
	color: #fff;
	margin-bottom: 15px;
	padding: 13px;
	border-radius: ${borderRadius}px;
`;
export const SubmitButton = styled.TouchableOpacity`
	align-items: center;
	justify-content: center;
	background-color: #004071;
	width: ${contentWidth - 30}%;
	height: 45px;
	border-radius: ${borderRadius}px;
	margin-top: 10px;
`;

export const SubmitText = styled.Text`
	font-size: 20px;
	color: #fff;
`;

export const Logo = styled.Image`
	width: 300px;
	height: 160px;
	top: -70px;
	margin-bottom: -10px;
`;
