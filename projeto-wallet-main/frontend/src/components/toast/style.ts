import styled, { css } from "styled-components";

export type ToastProps = {
  type: "ERROR" | "SUCCESS";
};

export const Toast = styled.div<ToastProps>`
  padding: 0.8rem 1.6rem;
  border-radius: 8px;
  margin: 2.4rem;
  ${({ type, theme }) => css`
    background-color: ${type === "ERROR"
      ? theme.COLORS.RED
      : theme.COLORS.GREEN};
  `};
`;
