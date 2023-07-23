import { Heading_3 } from "src/lib/fontStyle";
import styled from "styled-components";

export const Container = styled.div`
  position: relative;
`;

export const FilterContainer = styled.div`
  display: flex;
  justify-content: space-between;

  .sort {
    font-size: 1.4rem;
    font-style: normal;
    font-weight: 400;
    line-height: 150%;
    letter-spacing: -0.03rem;
    color: ${({ theme }) => theme.color.grey_500};
  }

  .filter-tags {
    display: flex;
    gap: 0.8rem;
  }
`;

export const CardContainer = styled.div`
  margin-top: 1.6rem;
`;

export const LoadingTitle = styled(Heading_3)`
  text-align: center;
  word-break: keep-all;
  color: ${({ theme }) => theme.color.grey_200};
`;
