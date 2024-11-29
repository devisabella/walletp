import styled, { css } from "styled-components";

export type CardMoneyProps = {
  type: "success" | "danger";
};

export const Card = styled.div<CardMoneyProps>`
  height: 14rem;
  border-radius: 8px;
  width: 100%;
  padding: 0.8rem;
  display: flex;
  flex-direction: column;

  ${({ type, theme }) => css`
    background-color: ${type === "success"
      ? theme.COLORS.GREEN_DARK
      : theme.COLORS.RED_DARK};
  `};
`;

export const ValueContainer = styled.div`
  display: flex;
  align-items: center;
  flex: 1;
`;
