import React from "react";
import styled from "styled-components";

export const FoodDetail = ({ setOpen, data }) => {
	return (
		<>
			<Overlay onClick={() => setOpen(false)}>
				<Wrapper>
					<div style={{ display: "flex" }}>
						<img src={data.image} alt="#" style={{ flex: "1" }} />
						<div style={{ flex: "1" }}>ddd</div>
					</div>
				</Wrapper>
			</Overlay>
		</>
	);
};

const Wrapper = styled.div`
	position: fixed;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	background-color: #fff;
	padding: 50px;
	z-index: 1000;
`;

const Overlay = styled.div`
	position: fixed;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	background-color: rgba(0, 0, 0, 0.7);
	z-index: 1000;
`;
