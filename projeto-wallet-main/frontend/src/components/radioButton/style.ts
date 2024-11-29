import styled, { css } from "styled-components";

type RadioProps = {
  selected?: boolean;
};

export const RadioGroup = styled.div`
  display: flex;
  flex-direction: row;
  gap: 1.6rem;
  margin-top: 1.6rem;
`;

export const RadioContainer = styled.label<RadioProps>`
  display: flex;
  align-items: center;
  cursor: pointer;
  gap: 0.5rem;

  ${({ theme }) => css`
    color: ${theme.COLORS.BLACK};
  `}
`;

export const HiddenRadio = styled.input.attrs({ type: "radio" })`
  display: none;
`;

export const CustomRadio = styled.span<RadioProps>`
  width: 2rem;
  height: 2rem;
  border-radius: 50%;
  border: 2px solid
    ${({ selected, theme }) =>
      selected ? theme.COLORS.BLUE_LIGHT : theme.COLORS.BLUE_DARK};
  display: flex;
  align-items: center;
  justify-content: center;
  transition: border-color 0.3s ease;

  &::after {
    content: "";
    width: 1rem;
    height: 1rem;
    border-radius: 50%;
    background: ${({ selected, theme }) =>
      selected ? theme.COLORS.BLUE : "transparent"};
    transition: background-color 0.3s ease;
  }
`;

export const Label = styled.span`
  font-size: ${({ theme }) => theme.FONT_SIZE.P};
  font-family: ${({ theme }) => theme.FONT_FAMILY};
`;
