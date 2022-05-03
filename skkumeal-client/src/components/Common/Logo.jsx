import styled from "styled-components";
import React, { memo } from "react";
export const Logo = memo((props) => {
	return (
		<Wrapper {...props}>
			<div style={{ display: "flex", flexDirection: "column" }}>
				<span>SKKU</span>
				<span>MEAL</span>
			</div>
		</Wrapper>
	);
});

const Wrapper = styled.div`
	letter-spacing: 5px;
	display: flex;
	font-size: 48px;
	color: #fff;
	justify-content: center;
`;
