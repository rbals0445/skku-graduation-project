import React from "react";
import styled from "styled-components";
import { Logo } from "../components";
import { Box, Button } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import { useNavigate } from "react-router-dom";

export const SignUp = () => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/");
  };

  return (
    <Wrapper>
      <Header>
        <HomeIcon onClick={handleClick} sx={{ fontSize: "48px" }} />
      </Header>
      <Logo />

      <InputForm>
        <Box sx={{ display: "flex", width: "400px" }}>
          <InputField required placeholder="이메일" />
          <StyledButton>인증하기</StyledButton>
        </Box>
        <Box sx={{ display: "flex", width: "400px" }}>
          <InputField required placeholder="아이디" />
          <StyledButton>중복확인</StyledButton>
        </Box>
        <Box>
          <InputField required placeholder="비밀번호" />
        </Box>
        <Box>
          <InputField required placeholder="비밀번호 확인  " />
        </Box>
      </InputForm>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;

  & > div {
    color: rgb(7, 42, 96);
  }
`;

const Header = styled.div`
  display: flex;
  margin-top: 40px;
  margin-right: 40px;
  font-size: 2rem;
  justify-content: flex-end;
`;

const InputField = styled.input`
  margin: 16px 0;
  padding: 0px;
  width: 400px;
  height: 40px;
  border-radius: 15px;
  text-indent: 10px;
`;

const StyledButton = styled(Button)`
  && {
    margin: 16px 8px;
    width: 100px;
    background-color: rgb(141, 198, 63);
    color: white;
    border-radius: 15px;
  }

  &&:hover {
    background-color: rgba(141, 198, 63, 0.6);
  }
`;

const InputForm = styled.form`
  border: solid red 3px;
  display: flex;
  align-items: center;
  flex-direction: column;
`;
