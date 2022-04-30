import React, { useState } from "react";
import styled from "styled-components";
import { Logo, StyledButton, Input, InputWithButton } from "../components";
import { Box } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { sendEmailAuthCode, fileUploadToDB, fileUploadToS3 } from "../apis";

export const SignUp = () => {
  const navigate = useNavigate();
  const [url, setUrl] = useState("");

  const { register, errors, getValues } = useForm({
    defaultValues: {
      id: "",
      password: "",
    },
  });

  const handleClick = () => {
    navigate("/");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    await fileUploadToDB(getValues(), url);
  };

  const handleAuth = async () => {
    const { email } = getValues();
    if (email.length) {
      try {
        await sendEmailAuthCode(email);
      } catch (e) {
        console.log(e);
      }
    }
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

  const handleOK = () => {
    alert("handleOK");
  };

  return (
    <Wrapper>
      <Header>
        <HomeIcon onClick={handleClick} sx={{ fontSize: "48px" }} />
      </Header>
      <Logo />

      <InputForm>
        <Box width="400px">
          <InputWithButton
            required
            placeholder="xxx@skku.edu"
            ref={register}
            name="email"
            value={"인증하기"}
            onClick={handleAuth}
          />
        </Box>

        <Box width="400px">
          <InputWithButton
            required
            placeholder="아이디"
            ref={register}
            name="id"
            value={"중복확인"}
          />
        </Box>

        <Input required placeholder="비밀번호" ref={register} name="pwd" />

        <Input
          required
          placeholder="비밀번호 확인"
          ref={register}
          name="pwdCheck"
        />

        <StyledButton
          type="submit"
          variant="contained"
          size="large"
          onClick={handleSubmit}
          value={"가입하기"}
          sx={{
            margin: "16px 0",
            width: "300px",
            backgroundColor: "rgba(7, 42, 96)",
          }}
        />
        {/* <label>이미지</label>
        <input
          type="file"
          name="fileUpload"
          onChange={handleSubmitFile}
          ref={register}
        />
        <label>카테고리</label>
        <input name="category" ref={register} />
        <label>이름</label>
        <input name="name" ref={register} />
        <label>위치</label>
        <input
          name="location"
          ref={register}
          value={"성균관대학교 자과캠"}
          onChange={null}
        />
        <label>영업시간</label>
        <input
          name="openhour"
          ref={register}
          value={"11:30 ~ 22:00"}
          onChange={null}
        />
        <label>전화번호</label>
        <input
          name="pn"
          ref={register}
          value={"010-1234-1234"}
          onChange={null}
        /> */}
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

const InputForm = styled.form`
  border: solid red 3px;
  display: flex;
  align-items: center;
  flex-direction: column;
`;
