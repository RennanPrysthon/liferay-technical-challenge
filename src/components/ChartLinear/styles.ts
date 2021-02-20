import { table } from 'console';
import styled from 'styled-components';

export const Container = styled.div`
  
`;

export const Canvas = styled.canvas`
  padding: 15px;
  height: 50%;
  width: calc(100% - 100px);
`
export const Header = styled.div`
  display: flex;
  padding: 0 20px;
`;

export const Tab = styled.div<{isActive: boolean}>`
  border-top: ${
    props => props.isActive ? 
      '3px solid #0b5fff;' : '3px solid #fff;'};
  min-width: 100px;
  text-align: left;
  cursor: pointer;
  transition: .3s;


  &:hover {
    border-top: 3px solid #0b5fff;
    background-color:#eee;
  }
  
  & > div {
    padding: 5px 10px;
  }

  & > div > h3 {
    font-size: 0.9em;
    font-weight: 100;
    color: ${
      props => props.isActive ? 
        '#333;' : '#777;'};  
  }

  & > div > span {
    font-size: 2em;
    font-weight: bold;
    color: ${
      props => props.isActive ? 
        '#333;' : '#777;'};  
  }
`

export const Title = styled.h3`
  font-size: 0.9em;
  font-weight: 100;
  color: #333;
`

export const Count = styled.div`
  font-size: 2em;
  font-weight: bold;
  color: #333;
`

