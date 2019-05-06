import React from "react";
import styled, { keyframes } from "styled-components";

const Container = styled.div`
	display: flex;
	justify-content: center;
	-ms-align-items: center;
	align-items: center;
	padding: 2em
`

const animate = keyframes`
	0% { 
		transform: rotate(0deg); 
		-webkit-transform: rotate(0deg);
	}
  100% { 
  	transform: rotate(360deg);
  	-webkit-transform: rotate(360deg); 
  }
`;

const Loader = styled.div`
	border: 1px solid #f3f3f3;
	border-radius: 50%;
	border-top: 1px solid #f90;
	width: 1.5rem;
	height: 1.5rem;
	animation: ${animate} 2s linear infinite;
	-webkit-animation: ${animate} 2s linear infinite;
`;
const Loading = props => {
	return (
		<Container>
			<Loader />
		</Container>
	);
};

export default Loading;
