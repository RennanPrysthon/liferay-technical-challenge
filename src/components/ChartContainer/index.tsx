import React from 'react';

import { Container, Header, Content } from './styles';

interface Props {
  type: 'small' | 'big';
  title: string;

}

const ChartContainer: React.FC<Props> = ({ type, title, children}) => {
  return (
    <Container
      type={type}
    >
      <Header>
        {title}
      </Header>
      <Content>
        {children}
      </Content>
    </Container>
  )
}

export default ChartContainer;