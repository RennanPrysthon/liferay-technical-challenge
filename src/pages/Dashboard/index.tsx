import React from 'react';
import Header from '../../components/Header';

import { Container, ChartContainers} from './styles';

const Dashboard: React.FC = () => {
  return (
    <Container>
      <Header />
      <ChartContainers>
        
      </ChartContainers>
    </Container>
  )
}

export default Dashboard;