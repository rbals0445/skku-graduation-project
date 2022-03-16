import styled from "styled-components";

function App() {
	//console.log(process.env.REACT_APP_TEST_ENV);
	let img = ["/favicon.ico", "/favicon.ico", "/favicon.ico", "/favicon.ico"];
	return (
		<Wrapper>
			<Header>MyPage</Header>
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
	display: flex;
	margin-top: 40px;
	margin-right: 40px;
	font-size: 2rem;
	justify-content: flex-end;
`;

const Logo = styled.div`
	display: flex;
	font-size: 100px;
	color: #fff;
	justify-content: center;
`;

const CategoryWrapper = styled.div`
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
