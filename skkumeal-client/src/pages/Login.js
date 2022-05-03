import React, { useState } from "react";
import styled from "styled-components";
import { Logo, StyledButton, Input } from "../components";
import HomeIcon from "@mui/icons-material/Home";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { isValidId } from "../constants/utils";
import { checkUserAccount } from "../apis";
import { myStorage } from "../constants/utils";

export const Login = () => {
	const navigate = useNavigate();
	const [text, setText] = useState("");

	const { register, setError, getValues, trigger, errors } = useForm({
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

		if (res.result) {
			await trigger();
			navigate("/");
			myStorage.setValue("Type", res.type);
			myStorage.setValue("id", id);
		} else {
			setError("password", {
				type: "manual",
				message: "아이디나 비밀번호를 다시 확인해주세요",
			});
		}
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
				<Input
					name="id"
					ref={register}
					placeholder="ID"
					required
					value={text}
					onChange={handleChange}
				/>
				<Input
					required
					type="password"
					autoComplete="off"
					name="password"
					placeholder="PWD"
					ref={register}
					errorMessage={errors.password?.message}
				/>

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
