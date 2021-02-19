import React from 'react';

import { Container, Image} from './styles'

import logo from '../../assets/imgs/logo.png'

const SideBar: React.FC = () => {
  return (
    <Container>
      <Image src={logo}/>
    </Container>
  )
}

export default SideBar;