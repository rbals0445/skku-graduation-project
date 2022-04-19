import styled from "styled-components";
import React, { memo } from "react";
export const Logo = React.memo(() => {
	return (
		<Wrapper>
			SKKU
			<br />
			MEAL
		</Wrapper>
	);
});

const Wrapper = styled.div`
	border: solid red 3px;
	letter-spacing: 10px;
	display: flex;
	font-size: 48px;
	color: #fff;
	justify-content: center;
`;
