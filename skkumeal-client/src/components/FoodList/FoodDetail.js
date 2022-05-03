import React, { useEffect, useState } from "react";
import styled from "styled-components";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { likeApi, dislikeApi, isLikeChecked } from "../../apis";
import { myStorage } from "../../constants/utils";

let timer;
export const FoodDetail = ({ setOpen, data }) => {
	const [like, setLike] = useState();

	const debounceFunction = (cb, delay) => {
		if (timer) clearTimeout(timer);
		timer = setTimeout(() => cb(), delay);
	};

	const handleLike = (e) => {
		e.stopPropagation();
		debounceFunction(
			async () => await likeApi(myStorage.getValue("id"), data.name),
			1500
		);

		setLike((prev) => !prev);
	};

	const handleDislike = async (e) => {
		e.stopPropagation();
		debounceFunction(
			async () => await dislikeApi(myStorage.getValue("id"), data.name),
			1500
		);

		setLike((prev) => !prev);
	};

	useEffect(() => {
		if (myStorage.getValue("id"))
			isLikeChecked(myStorage.getValue("id"), data.name).then((res) =>
				setLike(res.data.return)
			);
	}, []);

	return (
		<>
			<Overlay onClick={() => setOpen(false)}>
				<Wrapper>
					<div
						style={{
							display: "flex",
							flexDirection: "column",
						}}
					>
						<img src={data.image} alt="#" />
						<div style={{ display: "flex", justifyContent: "space-between" }}>
							<div style={{}}>
								<h1
									style={{
										margin: "15px 0 0 0",
										fontWeight: "500",
										color: "#222222",
									}}
								>
									{data.name}
								</h1>
								<h2
									style={{ margin: "0", fontWeight: "300", color: "#838689" }}
								>
									{data.location}
								</h2>
							</div>
							<div style={{ marginTop: "15px" }}>
								{localStorage.hasOwnProperty("id") &&
									(like ? (
										<FavoriteIcon
											onClick={handleDislike}
											sx={{ fontSize: "60px", color: "red" }}
										/>
									) : (
										<FavoriteBorderIcon
											onClick={handleLike}
											sx={{ fontSize: "60px", color: "red" }}
										/>
									))}
							</div>
						</div>

						<BottomWrapper>
							<hr />
							<h3>영업 시간</h3>
							<div>{data.open_hour || "등록되어 있지 않습니다"}</div>
							<br />
							<h3>매장 연락처</h3>
							<div>{data.phone_number || "등록되어 있지 않습니다"}</div>
							<br />
						</BottomWrapper>
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
	overflow-y: auto;
	max-height: calc(100vh - 210px);
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

const BottomWrapper = styled.div`
	h3 {
		margin: 0;
	}
`;
