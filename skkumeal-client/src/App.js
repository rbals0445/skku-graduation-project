import React, { useState, useEffect } from "react";
import styled from "styled-components";
import LoginIcon from "@mui/icons-material/Login";
import { useNavigate } from "react-router-dom";
import { Logo, StyledSmallButton } from "./components";
import { CATEGORY } from "./constants/constant";
import { myStorage } from "./constants/utils";
import { MediaCard } from "./components";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import { Grid, Box } from "@mui/material";
import { fetchRestaurant } from "./apis/searchApi";

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
  const [text, setText] = useState();
  const [result, setResult] = useState();

  const handleLoginBtnClick = () => {
    navigate("/login");
  };

  const handleCategory = (category) => {
    navigate(`/foodlist/${category}`);
  };

  const handleChange = (e) => {
    setText(e.target.value);
    // 여기서 e.target.value로 값 가져온걸 setData에 넣어줌.
    if (e.target.value.length === 0) {
      setData([]);
    } else setData([...arr.filter((elem) => elem.includes(e.target.value))]);
  };

  const handleMyPageClick = () => {
    navigate("/mypage");
  };

  const handleClick = (elem) => {
    setText(elem);
    setData([]);
  };

  const handleSearch = async () => {
    // text로 검색.
    const res = await fetchRestaurant(text);
    if (res.data.length > 0) {
      setResult(res.data[0]);
    } else {
      setResult([]); // 검색결과 X
    }
  };

  useEffect(() => {
    setType(myStorage.getValue("Type"));
  }, []);
  // cafe, restaurant, pub
  return (
    <Wrapper>
      <Header>
        {type !== "1" && type !== "2" ? (
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
          <SearchBar
            id="search"
            maxLength={30}
            onChange={handleChange}
            value={text || ""}
          />
          {data.length > 0 &&
            data.map((elem, key) => (
              <AutoOutput
                onClick={() => handleClick(elem)}
                style={{ paddingLeft: "24px" }}
                key={key}
              >
                {elem}
              </AutoOutput>
            ))}
        </SearchBarWrapper>
        <StyledSmallButton
          style={{
            backgroundColor: "rgba(7, 42, 96)",
            color: "white",
            margin: "0",
            height: "38px",
          }}
          onClick={handleSearch}
          value={"검색하기"}
        />
      </div>
      {result &&
        (result.length === 0 ? (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              mt: 3,
              fontSize: "24px",
            }}
          >
            결과 없음
          </Box>
        ) : (
          <Box sx={{ display: "flex", justifyContent: "center", mt: 10 }}>
            <MediaCard
              img={result?.image}
              location={result?.location}
              name={result?.name}
              openhour={result?.open_hour}
              width={"500px"}
            />
          </Box>
        ))}
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
  justify-content: center;
`;

const SearchBar = styled.input`
  display: flex;
  width: 640px;
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
