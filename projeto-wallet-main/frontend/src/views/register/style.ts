import styled, { css } from "styled-components";

export const Container = styled.div`
  display: flex;
  width: 100vw;
  height: 100vh;
`;

export const ContentContainer = styled.div`
  position: relative;
  flex: 1;
  display: flex;
  align-items: center;
  flex-direction: column;
  padding-top: 3.2rem;
`;

export const Logo = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 1rem;
  margin-bottom: 6.8rem;
`;

export const Form = styled.div`
  margin-top: 4rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 40rem;
  margin-bottom: 3.2rem;
`;

export const InputContainer = styled.div`
  margin-bottom: 1.6rem;
  width: 100%;
`;

export const ButtonContainer = styled.div`
  width: 35rem;
`;

export const GoBackButton = styled.i`
  position: absolute;
  top: 3.2rem;
  left: 2rem;
  font-size: 3.2rem;
  cursor: pointer;

  ${({ theme }) => css`
    color: ${theme.COLORS.BLUE_DARK};

    &:hover {
      color: ${theme.COLORS.BLUE};
    }
  `};
`;
