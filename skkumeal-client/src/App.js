import React, { useState, useEffect } from "react";
import styled from "styled-components";
import LoginIcon from "@mui/icons-material/Login";
import { useNavigate } from "react-router-dom";
import { Logo } from "./components";
import { CATEGORY } from "./constants/constant";
import { myStorage } from "./constants/utils";
import AccountBoxIcon from "@mui/icons-material/AccountBox";

function App() {
	let arr = [
		"수해복",
		"맥도날드",
		"역전할머니빙수",
		"역전할머니맥주",
		"마라탕",
		"검색기능확인",
	];

	const navigate = useNavigate();
	const [type, setType] = useState();
	const [data, setData] = useState([]);

	const handleLoginBtnClick = () => {
		navigate("/login");
	};

	const handleCategory = (category) => {
		navigate(`/foodlist/${category}`);
	};

	const handleChange = (e) => {
		if (e.target.value.length === 0) {
			setData([]);
		} else setData([...arr.filter((elem) => elem.includes(e.target.value))]);
	};

	const handleMyPageClick = () => {
		navigate("/mypage");
	};

	useEffect(() => {
		setType(myStorage.getValue("Type"));
	}, []);
	// cafe, restaurant, pub
	return (
		<Wrapper>
			<Header>
				{type !== "1" ? (
					<LoginIcon onClick={handleLoginBtnClick} sx={{ fontSize: "48px" }} />
				) : (
					<AccountBoxIcon onClick={handleMyPageClick} sx={{ fontSize: "48px" }}>
						회원 입니다
					</AccountBoxIcon>
				)}
			</Header>
			<Logo />
			{/* 카테고리 버튼 */}
			<CategoryWrapper>
				<Category>
					<div
						style={{ fontSize: "40px", cursor: "pointer" }}
						onClick={() => handleCategory("RESTAURANT")}
					>
						{CATEGORY.RESTAURANT}
					</div>
					<div
						style={{ fontSize: "40px", cursor: "pointer" }}
						onClick={() => handleCategory("PUB")}
					>
						{CATEGORY.PUB}
					</div>
					<div
						style={{ fontSize: "40px", cursor: "pointer" }}
						onClick={() => handleCategory("CAFE")}
					>
						{CATEGORY.CAFE}
					</div>
				</Category>
			</CategoryWrapper>
			{/* 검색바 */}
			<div style={{ display: "flex", justifyContent: "center" }}>
				<SearchBarWrapper>
					<SearchBar id="search" maxLength={30} onChange={handleChange} />
					{data.length > 0 &&
						data.map((elem, key) => (
							<AutoOutput
								onClick={handleMyPageClick}
								style={{ paddingLeft: "24px" }}
								key={key}
							>
								{elem}
							</AutoOutput>
						))}
				</SearchBarWrapper>
			</div>
		</Wrapper>
	);
}

const Wrapper = styled.div`
	display: flex;
	flex-direction: column;
	margin: 0;
	padding: 0;
	background-color: rgb(141, 198, 63);
	width: 100vw;
	height: 100vh;
`;

const Header = styled.div`
	border: solid red 3px;
	display: flex;
	margin-top: 40px;
	margin-right: 40px;
	font-size: 2rem;
	justify-content: flex-end;
`;

const CategoryWrapper = styled.div`
	border: solid red 3px;
	display: flex;
	justify-content: center;
	margin: 20px;
`;

const Category = styled.div`
	display: flex;
	width: 767px;
	justify-content: space-evenly;
`;

const SearchBarWrapper = styled.div`
	border: solid red 3px;

	justify-content: center;
`;

const SearchBar = styled.input`
	display: flex;
	width: 640px;

	border-color: red;
	min-height: 32px;
	font-size: 16px;
	justify-content: center;
	padding-left: 16px;
	text-indent: 10px;
`;

const AutoOutput = styled.div`
	background-color: white;
	&:hover {
		color: red;
	}
`;
export default App;
