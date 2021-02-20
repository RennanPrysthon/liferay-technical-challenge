import React from 'react';

import { Container, Header, Content } from './styles';

interface Props {
  title: string;
}

const ChartContainer: React.FC<Props> = ({ title, children}) => {
  return (
    <Container>
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