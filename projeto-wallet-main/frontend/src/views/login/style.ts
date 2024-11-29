import styled, { css } from "styled-components";

export const Container = styled.div`
  display: flex;
  width: 100vw;
  height: 100vh;
`;

export const ContentContainer = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

export const Welcome = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 1rem;
`;

export const Form = styled.div`
  margin-top: 3.2rem;
  display: flex;
  flex-direction: column;
  gap: 1.6rem;
  align-items: center;
  justify-content: center;
  width: 40rem;
  margin-bottom: 3.2rem;
`;

export const ForgotPasswordButton = styled.p`
  text-align: right;
  width: 40rem;
  text-decoration: underline;
  cursor: pointer;

  ${({ theme }) => css`
    font-family: ${theme.FONT_FAMILY};
    font-size: ${theme.FONT_SIZE.SMALL};
    font-weight: ${theme.FONT_WEIGHT.BOLD};
    color: ${theme.COLORS.BLUE_DARK};
    line-height: ${theme.FONT_SIZE.SMALL};

    &:hover {
      color: ${theme.COLORS.BLUE};
    }
  `};
`;

export const ButtonContainer = styled.div`
  width: 35rem;
`;

export const RegisterTextContainer = styled.div`
  margin-top: 8.9rem;
  margin-bottom: 1.6rem;
`;
