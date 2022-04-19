import styled from "styled-components";
import LoginIcon from "@mui/icons-material/Login";
import { useNavigate } from "react-router-dom";

function App() {
	//console.log(process.env.REACT_APP_TEST_ENV);
	const navigate = useNavigate();

	let img = ["/favicon.ico", "/favicon.ico", "/favicon.ico", "/favicon.ico"];

	const handleLoginBtnClick = () => {
		navigate("/login");
	};

	return (
		<Wrapper>
			<Header>
				<LoginIcon onClick={handleLoginBtnClick} sx={{ fontSize: "48px" }} />
			</Header>
			<Logo>SKKU MEAL</Logo>
			{/* 카테고리 버튼 */}
			<CategoryWrapper>
				<Category>
					{img.map((elem, idx) => (
						<img key={idx} src={elem} />
					))}
				</Category>
			</CategoryWrapper>
			{/* 검색바 */}
			<SearchBarWrapper>
				<SearchBar maxLength={30} />
			</SearchBarWrapper>
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

const Logo = styled.div`
	border: solid red 3px;
	display: flex;
	font-size: 100px;
	color: #fff;
	justify-content: center;
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
	display: flex;
	justify-content: center;
`;

const SearchBar = styled.input`
	display: flex;
	width: 640px;
	border-radius: 32px;
	border-color: red;
	min-height: 32px;
	font-size: 16px;
	justify-content: center;
	padding-left: 16px;
`;
export default App;
