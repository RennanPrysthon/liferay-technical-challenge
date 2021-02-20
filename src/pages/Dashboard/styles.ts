import styled from 'styled-components';

export const Container = styled.div`
  box-sizing: border-box;
`;

export const ChartContainers = styled.div<{type: 'small' | 'big'}>`
  margin: 10px;
  display: flex;
  flex-direction: ${p => p.type === 'big' ? 'column' : 'row'};
  align-items: center;
  justify-content: ${p => p.type === 'big' ? 'center' : 'space-around'}; ;
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
