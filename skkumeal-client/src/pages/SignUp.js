import React, { useState } from "react";
import styled from "styled-components";
import { Logo, StyledButton, Input, InputWithButton } from "../components";
import HomeIcon from "@mui/icons-material/Home";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import {
	sendEmailAuthCode,
	checkAuthCode,
	checkDuplicatedId,
	userSignup,
} from "../apis";
import { REGEXP_VALID_EMAIL } from "../constants/regexp";

export const SignUp = () => {
	const navigate = useNavigate();

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

	// 최종 제출
	const onSubmit = async (data) => {
		const { email: disEmail, id: disId, authCode: disAuthCode } = disabled;
		const { email, id, pwd, pwdCheck } = getValues(); // trigger하면서 값이 사라짐

		if (pwd === pwdCheck) {
			trigger(["pwd", "pwdCheck"]);
		} else {
			const error = [
				{
					type: "manual",
					name: "pwd",
					message: "비밀번호를 다시 확인해주세요",
				},
				{
					type: "manual",
					name: "pwdCheck",
					message: "비밀번호를 다시 확인해주세요",
				},
			];

			error.forEach(({ name, type, message }) =>
				setError(name, { type, message })
			);

			return;
		}

		if (disEmail && disId && disAuthCode && pwd === pwdCheck) {
			await userSignup(email, id, pwd);
			alert("가입이 완료되었습니다"); // dialog로 바꿔야함
			navigate("/");
		} else {
			alert("아이디와 이메일을 확인해주세요");
		}

		// console.log(data);
		// trigger();
		//navigate("/");
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

	const handleCheckDuplicatedId = async () => {
		const { id } = getValues();

		try {
			const res = await checkDuplicatedId(id);

			if (res.data.result) {
				// 중복인경우
				setError("id", {
					type: "manual",
					message: "이미 존재하는 id입니다.",
				});
			} else {
				setDisabled((prev) => ({ ...prev, id: true }));
				await trigger("id");
			}
		} catch (e) {
			console.log(e);
		}
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
					onClick={handleCheckDuplicatedId}
					disabled={disabled.id}
					errorMessage={errors.id?.message}
				/>

				<Input
					type="password"
					required
					placeholder="비밀번호"
					ref={register}
					name="pwd"
					errorMessage={errors.pwd?.message}
				/>

				<Input
					type="password"
					required
					placeholder="비밀번호 확인"
					ref={register}
					name="pwdCheck"
					errorMessage={errors.pwdCheck?.message}
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
	display: flex;
	align-items: center;
	flex-direction: column;
`;
