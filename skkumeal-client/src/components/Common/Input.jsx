import React from "react";
import styled from "styled-components";
import { StyledSmallButton } from "./StyledButton";

export const Input = React.forwardRef(({ errorMessage, ...props }, ref) => {
  return (
    <div>
      <InputField {...props} ref={ref} />
      {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
    </div>
  );
});

export const InputWithButton = React.forwardRef(
  ({ width, value, onClick, errorMessage, disabled, ...props }, ref) => {
    return (
      <>
        <Wrapper style={{ width }}>
          <div style={{ display: "flex" }}>
            <InputField {...props} disabled={disabled} ref={ref} />
            <StyledSmallButton
              disabled={disabled}
              onClick={onClick}
              value={value}
            />
          </div>
          <div>
            {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
          </div>
        </Wrapper>
      </>
    );
  }
);

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const InputField = styled.input`
  margin: 16px 0 0 0;
  padding: 0px;
  width: 400px;
  height: 40px;
  border-radius: 15px;
  text-indent: 10px;
  box-sizing: border-box;
`;

const ErrorMessage = styled.p`
  color: red;
  margin: 4px 0 0 4px;
  padding: 0;
  justify-content: flex-start;
`;
