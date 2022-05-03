import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { myStorage } from "../constants/utils";
import { Grid, Box } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import { useNavigate } from "react-router-dom";
import { Logo } from "../components";
import {
	StyledSmallButton,
	MediaCard,
	Input,
	SelectBox,
	StyledButton,
} from "../components";
import { useForm } from "react-hook-form";
import { fileUploadToDB, fileUploadToS3, fetchMyLikeLists } from "../apis";

export const MyPage = () => {
	const [data, setData] = useState([]);
	const [url, setUrl] = useState("");
	const [date, setDate] = useState([]);

	const { register, getValues, handleSubmit } = useForm();
	const navigate = useNavigate();

	const handleHomeBtn = () => {
		navigate("/");
	};

	const handleLogout = () => {
		myStorage.clearStorage();
		navigate("/");
	};

	const handleSubmitFile = async () => {
		try {
			const pos = await fileUploadToS3(getValues("fileUpload"));
			setUrl(pos.data.result);
		} catch (e) {
			console.log(e);
		}

		// 이거 보내고 그 다음에 그거 받아서 DB에 넣음.
	};

	const onSubmit = async (data) => {
		await fileUploadToDB(data, url);
	};

	useEffect(() => {
		fetchMyLikeLists(myStorage.getValue("id")).then((res) =>
			setData([...res.data.rows])
		);

		let temp = [];
		for (let i = 0; i < 24; i++) {
			temp.push([`${String(i).padStart(2, "0")}:00`]);
		}
		setDate(temp);
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
				{myStorage.getValue("Type") === "1" ? (
					<>
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
					</>
				) : (
					<>
						<Typo>Admin Page</Typo>
						<InputForm onSubmit={handleSubmit(onSubmit)}>
							<SelectBox
								name="category"
								ref={register}
								placeholder="카테고리"
								required
							>
								<option value="">카테고리</option>
								<option>restaurant</option>
								<option>cafe</option>
								<option>pub</option>
							</SelectBox>
							<Input name="name" ref={register} placeholder="이름" required />
							<Input name="location" ref={register} placeholder="위치" />
							<Input name="pn" ref={register} placeholder="전화번호" />
							<div style={{ display: "flex", width: "400px" }}>
								<SelectBox
									style={{ width: "200px" }}
									ref={register}
									name={"openhour"}
								>
									<option value="">영업 시작</option>
									{date.length > 0 &&
										date.map((elem, key) => <option key={key}>{elem}</option>)}
								</SelectBox>
								<SelectBox
									style={{ width: "200px" }}
									ref={register}
									name={"closehour"}
								>
									<option value="">영업 종료</option>
									{date.length > 0 &&
										date.map((elem, key) => <option key={key}>{elem}</option>)}
								</SelectBox>
							</div>
							<Input
								required
								type="file"
								name="fileUpload"
								onChange={handleSubmitFile}
								ref={register}
								placeholder="이미지"
								accept="image/png, image/jpeg"
							/>
							<StyledButton
								type="submit"
								variant="contained"
								size="large"
								value={"등록하기"}
								sx={{
									margin: "16px 0",
									width: "300px",
									backgroundColor: "rgba(7, 42, 96)",
								}}
							/>
						</InputForm>
					</>
				)}
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

const InputForm = styled.form`
	display: flex;
	align-items: center;
	flex-direction: column;
`;
