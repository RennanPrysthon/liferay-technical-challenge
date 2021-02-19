import React from 'react';
import SideBar from '../../components/sidebar';
import Dashboard from '../Dashboard';

import { Container } from './styles';

const Home: React.FC = () => {
  return (
    <Container>
      <SideBar/>
      <Dashboard/>
    </Container>
  )
}

export default Home;