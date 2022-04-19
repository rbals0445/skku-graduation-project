import React, { useState } from "react";
import styled from "styled-components";
import { Logo } from "../components";
import HomeIcon from "@mui/icons-material/Home";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import { useForm } from "react-hook-form";
import { isValidId } from "../constants/utils";

export const Login = () => {
	const navigate = useNavigate();
	const [text, setText] = useState("");

	const { register, setError, errors, getValues, clearErrors } = useForm({
		defaultValues: {
			id: "",
			password: "",
		},
	});

	const handleSubmit = (e) => {
		e.preventDefault();
		const { id, password } = getValues();
		/*
      아이디 비번만 확인하면 됨.
    */
	};

	const handleLoginBtnClick = () => {
		navigate("/");
	};

	const handleChange = (e) => {
		console.log(e.target.value);
		if (!isValidId(e.target.value)) return;
		setText(e.target.value);
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
				<StyledButton type="submit" variant="contained" size="large">
					로그인
				</StyledButton>
				<StyledButton variant="contained" size="large">
					회원가입
				</StyledButton>
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

const StyledButton = styled(Button)`
	&& {
		margin: 16px 0;
		width: 300px;
		background-color: rgba(7, 42, 96);
	}
`;
