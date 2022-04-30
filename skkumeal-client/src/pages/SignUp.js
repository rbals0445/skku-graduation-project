import React, { useState } from "react";
import styled from "styled-components";
import { Logo, StyledButton, Input, InputWithButton } from "../components";
import HomeIcon from "@mui/icons-material/Home";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import {
  sendEmailAuthCode,
  fileUploadToDB,
  fileUploadToS3,
  checkAuthCode,
} from "../apis";
import { REGEXP_VALID_EMAIL } from "../constants/regexp";

export const SignUp = () => {
  const navigate = useNavigate();

  const [url, setUrl] = useState("");
  const [disabled, setDisabled] = useState({
    email: false,
    id: false,
    authCode: false,
  });

  const { register, errors, getValues, handleSubmit, trigger, setError } =
    useForm({
      defaultValues: {
        id: "",
        password: "",
      },
    });

  const handleClick = () => {
    navigate("/");
  };

  const onSubmit = async (data) => {
    console.log(data);
    navigate("/");
    // await fileUploadToDB(getValues(), url);
  };

  const handleAuth = async () => {
    const { email } = getValues();

    if (await trigger()) {
      try {
        setDisabled((prev) => ({ ...prev, email: true }));
        await sendEmailAuthCode(email);
      } catch (e) {
        console.log(e);
      }
    }
  };

  const handleCheckAuthCode = async () => {
    const { email, authCode } = getValues();
    try {
      console.log(authCode);

      const res = await checkAuthCode(email, authCode);

      if (res.data.result) {
        setDisabled((prev) => ({ ...prev, authCode: true }));
        await trigger("authCode"); // setError하고 trigger하면 그냥 error 사라져버림.
      } else {
        setError("authCode", {
          type: "manual",
          message: "인증코드를 다시 확인해주세요",
        });
      }
    } catch (e) {
      console.log(e);
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

      <InputForm onSubmit={handleSubmit(onSubmit)}>
        <InputWithButton
          required
          width="400px"
          placeholder="xxx@skku.edu"
          ref={register({
            pattern: {
              value: REGEXP_VALID_EMAIL,
              message: "xxx@skku.edu 형식으로 입력해주세요",
            },
            required: {
              value: true,
              message: "이메일을 입력해주세요",
            },
          })}
          name="email"
          value={"인증하기"}
          onClick={handleAuth}
          errorMessage={errors.email?.message}
          disabled={disabled.email}
        />

        {disabled.email && (
          <InputWithButton
            required
            width="400px"
            placeholder="인증코드 입력"
            ref={register}
            name="authCode"
            value={"확인하기"}
            onClick={handleCheckAuthCode}
            disabled={disabled.authCode}
            errorMessage={errors.authCode?.message}
          />
        )}

        <InputWithButton
          required
          placeholder="아이디"
          ref={register}
          name="id"
          value={"중복확인"}
          width="400px"
          disabled={disabled.id}
        />

        <Input
          type="password"
          required
          placeholder="비밀번호"
          ref={register}
          name="pwd"
        />

        <Input
          type="password"
          required
          placeholder="비밀번호 확인"
          ref={register}
          name="pwdCheck"
        />

        <StyledButton
          type="submit"
          variant="contained"
          size="large"
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
