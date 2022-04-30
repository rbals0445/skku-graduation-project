import React from "react";
import styled from "styled-components";
import { StyledSmallButton } from "./StyledButton";

export const Input = React.forwardRef((props, ref) => {
  return <InputField {...props} ref={ref} />;
});

export const InputWithButton = React.forwardRef(
  ({ value, onClick, ...props }, ref) => {
    return (
      <Wrapper>
        <Input {...props} ref={ref} />
        <StyledSmallButton onClick={onClick} value={value} />
      </Wrapper>
    );
  }
);

const Wrapper = styled.div`
  display: flex;
`;

const InputField = styled.input`
  margin: 16px 0;
  padding: 0px;
  width: 400px;
  height: 40px;
  border-radius: 15px;
  text-indent: 10px;
`;
