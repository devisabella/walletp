import styled, { css } from "styled-components";

export const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 2.4rem;
  width: 100vw;

  ${({ theme }) => css`
    background-color: ${theme.COLORS.GREEN_DARK};
  `};
`;

export const LogoutButton = styled.div`
  display: flex;
  gap: 0.4rem;
  align-items: center;
  cursor: pointer;

  ${({ theme }) => css`
    i {
      font-size: 3.2rem;
      color: ${theme.COLORS.WHITE};
    }
    &:hover {
      i,
      p {
        color: ${theme.COLORS.GREY_LIGHT};
      }
    }
  `};
`;
