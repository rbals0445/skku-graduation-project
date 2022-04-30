import { Button } from "@mui/material";
import styled from "styled-components";
// TODO: 표준 규격을 정하고, 오버라이드 하고싶으면 내가 넣는 식으로 해야함.

// Long size
export const StyledButton = ({ value, ...props }) => {
  return <Button {...props}>{value}</Button>;
};

// Small size
export const StyledSmallButton = ({ value, ...props }) => {
  return <SmallButton {...props}>{value}</SmallButton>;
};

const SmallButton = styled(Button)`
  && {
    margin: 16px 0 0 8px;
    width: 100px;
    background-color: rgb(141, 198, 63);
    color: white;
    border-radius: 15px;
  }

  &&:hover {
    background-color: rgba(141, 198, 63, 0.6);
  }
`;
