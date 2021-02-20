import styled from 'styled-components';

export const Container = styled.div`
  height: 100%;
  display: grid;
  grid-template-columns: 70px 3fr;
  @media only screen and (max-width: 967px) {
    & {
      grid-template-columns: 100%
    }
  }
`;  

