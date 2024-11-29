import { css, styled } from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  padding: 4rem 2.4rem;
  height: 100%;
`;

export const Title = styled.div`
  display: flex;
  align-items: center;
  gap: 1.6rem;
  margin-bottom: 4rem;
`;

export const GoBackButton = styled.i`
  font-size: 3.2rem;
  cursor: pointer;

  ${({ theme }) => css`
    color: ${theme.COLORS.BLUE_DARK};

    &:hover {
      color: ${theme.COLORS.BLUE};
    }
  `};
`;

export const InputRequiredContainer = styled.div`
  display: flex;
  gap: 1.6rem;
  margin-top: 2.4rem;
  margin-bottom: 2.4rem;
`;

export const InputDescriptionContainer = styled.div`
  flex-grow: 2;
`;

export const InputDefaultContainer = styled.div`
  flex-grow: 1;
`;

export const ButtonGroupContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  flex: 1;
  gap: 1.6rem;
`;

export const ButtonContainer = styled.div`
  align-self: flex-end;
  width: 35rem;
  margin-top: 4rem;
`;
