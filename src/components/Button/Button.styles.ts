import styled, { css } from "styled-components/native";

interface ButtonContainerProps {
  fullWidth?: boolean;
  disabled?: boolean;
  variant?: "contained" | "outlined";
}

export const ButtonContainer = styled.TouchableOpacity<ButtonContainerProps>`
  background: #7b66ff;
  border-radius: 8px;
  height: 48px;
  justify-content: center;
  align-items: center;
  flex-direction: row;
  padding: 0px 16px;
  width: ${({ fullWidth }) => (fullWidth ? "100%" : "auto")};
  gap: 12px;

  ${({ disabled }) =>
    disabled &&
    css`
      background: rgba(0, 0, 0, 0.6);
    `}

  ${({ variant }) =>
    variant === "outlined" &&
    css`
      background: rgba(255, 255, 255, 0.1);
      border: 1px solid #000;
    `}
`;

export const ButtonText = styled.Text<{ variant?: "contained" | "outlined" }>`
  font-size: 16px;
  color: #fff;
  font-weight: bold;

  ${({ variant }) =>
    variant === "outlined" &&
    css`
      color: #000;
    `}
`;
