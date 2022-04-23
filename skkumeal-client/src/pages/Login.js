import React, { useState } from "react";
import styled from "styled-components";
import { Logo, StyledButton } from "../components";
import HomeIcon from "@mui/icons-material/Home";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { isValidId } from "../constants/utils";
import { checkUserAccount } from "../apis";

export const Login = () => {
  const navigate = useNavigate();
  const [text, setText] = useState("");

  const { register, errors, getValues } = useForm({
    defaultValues: {
      id: "",
      password: "",
    },
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { id, password } = getValues();
    let res = await checkUserAccount({ id, password });
    res = res.data;

    if (res.id === id && res.password === password) {
      console.log("pass");
    } else {
      alert("아이디 비밀번호를 다시 입력해주세요");
      console.log("error");
    }

    /*
      아이디 비번만 확인하면 됨.
    */
  };

  const handleLoginBtnClick = () => {
    navigate("/");
  };

  const handleChange = (e) => {
    if (!isValidId(e.target.value)) return;
    setText(e.target.value);
  };

  const handleSignUpBtnClick = () => {
    navigate("/signup");
  };

  return (
    <Wrapper>
      <Header>
        <HomeIcon onClick={handleLoginBtnClick} sx={{ fontSize: "48px" }} />
      </Header>
      <Logo />
      {/* 로그인 UI */}

      <InputForm onSubmit={handleSubmit}>
        <InputField
          name="id"
          ref={register}
          placeholder="ID"
          required
          value={text}
          onChange={handleChange}
        />
        {errors.id && <p>{errors.id.message}</p>}
        <InputField
          required
          type="password"
          autoComplete="off"
          name="password"
          placeholder="PWD"
          ref={register}
        />
        {errors.password && <p>{errors.password.message}</p>}
        <StyledButton
          type="submit"
          variant="contained"
          size="large"
          value={"로그인"}
          sx={{
            margin: "16px 0",
            width: "300px",
            backgroundColor: "rgba(7, 42, 96)",
          }}
        />

        <StyledButton
          onClick={handleSignUpBtnClick}
          variant="contained"
          size="large"
          sx={{
            margin: "16px 0",
            width: "300px",
            backgroundColor: "rgba(7, 42, 96)",
          }}
          value={"회원가입"}
        ></StyledButton>
      </InputForm>
    </Wrapper>
  );
};

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

const InputForm = styled.form`
  border: solid red 3px;
  display: flex;
  align-items: center;
  flex-direction: column;
`;

const InputField = styled.input`
  margin: 16px 0;
  width: 400px;
  height: 40px;
  border-radius: 15px;
  text-indent: 10px;
  border: 0px solid white;
`;
