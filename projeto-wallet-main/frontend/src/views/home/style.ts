import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  padding: 4rem 2.4rem;
  height: 100%;
`;

export const CardsContainer = styled.div`
  display: flex;
  width: 100%;
  gap: 1.6rem;
`;

export const TransactionsHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 4rem;
  margin-bottom: 2.4rem;
`;

export const ButtonContainer = styled.div`
  width: 35rem;
`;

export const TransactionsContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  overflow-y: auto;
`;
