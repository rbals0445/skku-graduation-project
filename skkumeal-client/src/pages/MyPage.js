import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { MediaCard } from "../components";
import { fetchMyLikeLists } from "../apis/userApi";
import { myStorage } from "../constants/utils";
import { Grid, Box } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import { useNavigate } from "react-router-dom";
import { Logo } from "../components";
import { StyledSmallButton } from "../components";

export const MyPage = () => {
	const [data, setData] = useState([]);
	const navigate = useNavigate();

	const handleHomeBtn = () => {
		navigate("/");
	};

	const handleLogout = () => {
		myStorage.clearStorage();
		navigate("/");
	};

	useEffect(() => {
		fetchMyLikeLists(myStorage.getValue("id")).then((res) =>
			setData([...res.data.rows])
		);
	}, []);

	return (
		<>
			<Wrapper>
				<Header>
					<HomeIcon onClick={handleHomeBtn} sx={{ fontSize: "48px" }} />
				</Header>
				<div
					style={{
						display: "flex",
						justifyContent: "center",
						marginTop: "20px",
					}}
				>
					<img width={"200px"} src={"/skkumr.png"} alt={"#"} />
					<div
						style={{
							display: "flex",
							flexDirection: "column",
						}}
					>
						<Logo
							style={{
								color: "rgb(141, 198, 63)",
								marginLeft: "8px",
								padding: "0",
							}}
						/>
						<StyledSmallButton value={"Logout"} onClick={handleLogout} />
					</div>
				</div>

				<Typo>{myStorage.getValue("id")}`s PICK</Typo>
				<Box
					sx={{
						display: "flex",
						padding: "16px",
						flexGrow: 1,
						backgroundColor: "rgba(0, 0, 0, 0.1)",
						height: "100vh",
					}}
				>
					<Grid container>
						{data.length > 0 &&
							data.map((elem, idx) => (
								<Grid mt={3} item sm={12} md={6} lg={4} xl={3} key={idx}>
									<MediaCard
										img={elem.image}
										location={elem.location}
										name={elem.name}
										openhour={elem.open_hour}
									/>
								</Grid>
							))}
					</Grid>
				</Box>
			</Wrapper>
		</>
	);
};

const Wrapper = styled.div`
	display: flex;
	flex-direction: column;
	margin: 0;
	padding: 0;
`;

const Header = styled.div`
	display: flex;
	margin-top: 40px;
	margin-right: 40px;
	font-size: 2rem;
	justify-content: flex-end;
`;

const Typo = styled.div`
	display: flex;
	justify-content: center;
	margin: 16px 0;
	font-size: 60px;
	color: rgb(7, 42, 96);
`;
