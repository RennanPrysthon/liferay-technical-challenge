import styled from 'styled-components';

export const Container = styled.div<{type: string}>`
  width: ${props => props.type === 'big' ? '90%' : '40%' };
  background-color: var(--white);
`;

export const Header = styled.div`
  display: flex;
  padding: 10px 20px;
  border-bottom: 2px solid #eee;
  font-size: 0.9em;
  font-weight: 550;
`;

export const Content = styled.div`

`;
