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
`;

export const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  flex: 1;
`;

export const Title = styled.div`
  margin-bottom: 2.4rem;
`;

export const InputContainer = styled.div`
  width: 40rem;
  margin-bottom: 1.6rem;
`;

export const ButtonContainer = styled.div`
  margin-top: 0.8rem;
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
