import styled from "styled-components/native";

export const Container = styled.View`
	position: absolute;
	left: 0px;
	right: 0px;
	top: 0px;
	bottom: 0px;
	align-items: center;
	justify-content: center;
`;
export const Loading = styled.ActivityIndicator.attrs({
	color: "white",
	size: "large",
})``;
