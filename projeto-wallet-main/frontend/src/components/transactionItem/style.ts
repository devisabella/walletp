import styled, { css } from "styled-components";
import { TransactionType } from "../../@types/transaction";

export type ItemProps = {
  type: TransactionType;
};

export const Item = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  gap: 1.6rem;
  padding: 1.6rem 0.8rem;
  box-shadow: 1px 4px 4px rgba(0, 0, 0, 0.25);
`;

export const TextContainer = styled.div`
  flex: 1;
`;

export const Icon = styled.i<ItemProps>`
  ${({ type, theme }) => css`
    font-size: 2.4rem;
    color: ${type === "Receita" ? theme.COLORS.GREEN : theme.COLORS.RED};
  `};
`;

export const TransactionDetailButton = styled.div`
  display: flex;
  justify-content: end;
  text-decoration: underline;
  cursor: pointer;
  ${({ theme }) => css`
    p {
      &:hover {
        color: ${theme.COLORS.BLUE};
        text-align: left;
      }
    }
  `};
`;
