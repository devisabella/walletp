import styled, { css } from "styled-components";
import { DefaultTheme } from "styled-components/dist/types";

export type ButtonType = "SOLID" | "OUTLINE" | "DANGER";

type ButtonThemeProps = {
  buttonType: ButtonType;
};

function getBackgroundColor(type: ButtonType, theme: DefaultTheme) {
  switch (type) {
    case "SOLID":
      return theme.COLORS.BLUE_DARK;
    case "OUTLINE":
      return "transparent";
    case "DANGER":
      return "transparent";
  }
}

function getBackgroundHoverColor(type: ButtonType, theme: DefaultTheme) {
  switch (type) {
    case "SOLID":
      return theme.COLORS.BLUE;
    case "OUTLINE":
      return "transparent";
    case "DANGER":
      return "transparent";
  }
}
function getBorderColor(type: ButtonType, theme: DefaultTheme) {
  switch (type) {
    case "SOLID":
      return "transparent";
    case "OUTLINE":
      return theme.COLORS.BLUE_DARK;
    case "DANGER":
      return theme.COLORS.RED_DARK;
  }
}

function getBorderHoverColor(type: ButtonType, theme: DefaultTheme) {
  switch (type) {
    case "SOLID":
      return "transparent";
    case "OUTLINE":
      return theme.COLORS.BLUE;
    case "DANGER":
      return theme.COLORS.RED_LIGHT;
  }
}

function getTextHoverColor(type: ButtonType, theme: DefaultTheme) {
  switch (type) {
    case "SOLID":
      return theme.COLORS.WHITE;
    case "OUTLINE":
      return theme.COLORS.BLUE;
    case "DANGER":
      return theme.COLORS.RED_LIGHT;
  }
}

export const Button = styled.div<ButtonThemeProps>`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.8rem;
  width: 100%;
  border-radius: 8px;
  cursor: pointer;
  height: 5rem;

  ${({ buttonType, theme }) => css`
    background-color: ${getBackgroundColor(buttonType, theme)};
    border: 2px SOLID ${getBorderColor(buttonType, theme)};

    &:hover {
      background-color: ${getBackgroundHoverColor(buttonType, theme)};
      border: 2px SOLID ${getBorderHoverColor(buttonType, theme)};

      p {
        color: ${getTextHoverColor(buttonType, theme)};
      }
    }
  `};
`;
