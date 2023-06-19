import styled from "styled-components";

export const Container = styled.div`
  width: 100%;
  display: inline-flex;
  flex-direction: column;
  overflow: hidden;
`;

export const Input = styled.input`
  padding: 0 0 0.8rem 0;
  font-size: 20px;
  line-height: 1.25em;
  font-weight: 400;
  color: ${({ theme }) => theme.color.grey_400};
  flex-grow: 1;
  flex-shrink: 0;

  background: transparent;
  border: none;
  outline: none;
  border-bottom: 1px solid ${({ theme }) => theme.color.grey_600};

  &:focus {
    border-bottom: 1px solid #5464f2;
  }

  ::placeholder {
    color: ${({ theme }) => theme.color.grey_600};
    font-size: 1.8rem;
    font-height: 1.27em;
  }
`;

export const Label = styled.label`
  font-size: 1.3rem;
  line-height: 1.5em;
  color: ${({ theme }) => theme.color.grey_300};
  font-weight: 300;
  margin-bottom: 1.2rem;
`;