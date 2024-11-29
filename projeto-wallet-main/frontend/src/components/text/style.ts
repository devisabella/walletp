import styled, { css } from "styled-components";

export type TextProps = {
  size: "SMALL" | "P" | "H1" | "H2" | "H3" | "H4" | "H5";
  weight: "REGULAR" | "BOLD";
  color:
    | "WHITE"
    | "BLACK"
    | "GREY_LIGHT"
    | "GREY"
    | "BLUE_LIGHT"
    | "BLUE"
    | "BLUE_DARK"
    | "GREEN_LIGHT"
    | "GREEN"
    | "GREEN_DARK"
    | "RED_LIGHT"
    | "RED"
    | "RED_DARK";
};

export const Text = styled.p<TextProps>`
  ${({ size, weight, color, theme }) => css`
    font-family: ${theme.FONT_FAMILY};
    font-size: ${theme.FONT_SIZE[size]};
    font-weight: ${theme.FONT_WEIGHT[weight]};
    color: ${theme.COLORS[color]};
    line-height: ${theme.FONT_SIZE[size]};
  `};
`;
