import styled from "styled-components";

export const StyledGuestList = styled.div`
  border: 1px solid var(--color-grey-200);
  border-top: none;
  border-bottom-left-radius: var(--border-radius-md);
  border-bottom-right-radius: var(--border-radius-md);
  overflow: hidden;
  padding-top: 0.8rem;
  transform: translateY(-4px);
`;

export const List = styled.ul``;

export const PaginationContainer = styled.div`
  border-top: 1px solid var(--color-grey-100);
  background-color: var(--color-grey-50);
  display: flex;
  justify-content: center;
  padding: 0.8rem;

  &:not(:has(*)) {
    display: none;
  }
`;
