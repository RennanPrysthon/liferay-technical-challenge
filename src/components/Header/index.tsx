import React from 'react';

import { Container, Title, Subtitle } from './styles';

const Header: React.FC = () => {
  return (
    <Container>
      <Title>
        Liferay
      </Title>
      <Subtitle>
        liferay-portal
      </Subtitle>
    </Container>
  )
}

export default Header;