import styled, { css } from "styled-components";

type InputProps = {
  active: boolean;
};

export const InputContainer = styled.div<InputProps>`
  border-radius: 8px;
  gap: 0.8rem;
  padding: 1.6rem 0.8rem;
  display: flex;
  width: 100%;
  align-items: center;

  ${({ active, theme }) => css`
    border: 2px solid ${active ? theme.COLORS.BLUE : theme.COLORS.BLUE_DARK};
    color: ${theme.COLORS.BLACK};

    &::placeholder {
      color: ${theme.COLORS.GREY};
    }
  `};
`;

export const Input = styled.input`
  flex: 1;
  border: none;
  outline: none;

  ${({ theme }) => css`
    font-family: ${theme.FONT_FAMILY};
    font-size: ${theme.FONT_SIZE.P};
    color: ${theme.COLORS.BLACK};

    &::placeholder {
      color: ${theme.COLORS.GREY};
    }
  `};
`;

export const Label = styled.div`
  width: 100%;
  margin-bottom: 0.8rem;
`;

export const Icon = styled.i`
  font-size: 3rem;

  ${({ theme }) => css`
    color: ${theme.COLORS.BLACK};
  `};
`;

export const ShowPassowrdButton = styled.i`
  font-size: 2.4rem;
  cursor: pointer;

  ${({ theme }) => css`
    color: ${theme.COLORS.BLUE_DARK};

    &:hover {
      color: ${theme.COLORS.BLUE};
    }
  `};
`;
