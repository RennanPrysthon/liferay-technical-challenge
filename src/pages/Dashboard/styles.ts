import styled from 'styled-components';

export const Container = styled.div`
  box-sizing: border-box;
`;

export const Header = styled.div`
  background-color: var(--white);
  padding: 20px;
  display: flex;
  flex-direction: column;
  background-color: #fff;
`;

export const Title = styled.input`
  font-size:1.5em;
  font-weight: 100;
`;
export const Subtitle = styled.input`
  font-weight: 100;
  font-size: 0.9em;
  color: #777;
`;

export const GridContent = styled.div`
  padding: 20px;
  display: grid;
  width: 100%;
  grid-template-rows: 1fr;
  grid-template-columns: 100%;
  grid-gap: 20px;
`

export const GridLarge = styled.div`
  background-color: var(--white);
  border-radius: 10px;
  box-shadow: 2px 3px 4px 1px rgba(230,230,230,0.72);
-webkit-box-shadow: 2px 3px 4px 1px rgba(230,230,230,0.72);
-moz-box-shadow: 2px 3px 4px 1px rgba(230,230,230,0.72);
`

export const GridSmall = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 20px;
  @media only screen and (max-width: 967px) {
    grid-template-columns: 100%;
  }
`

export const GridItem = styled.div`
  background-color: var(--white);
  border-radius: 5px;
  box-shadow: 2px 3px 4px 1px rgba(230,230,230,0.72);
-webkit-box-shadow: 2px 3px 4px 1px rgba(230,230,230,0.72);
-moz-box-shadow: 2px 3px 4px 1px rgba(230,230,230,0.72);
`
