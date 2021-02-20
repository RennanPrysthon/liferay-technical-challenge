import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js';

import { Container, Canvas} from './styles';

const ChartBar: React.FC = () => {
  const chartContentRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    new Chart(chartContentRef.current, {
      type: 'bar',
      data: {
          labels: ['Small', 'Medium', 'Large'],
          datasets: [{
            label: 'teste',
            data: [12, 19, 22],
            backgroundColor: [
              '#4b9bff',
              '#4b9bff',
              '#4b9bff',
            ],
            borderColor: [
              '#4b9bff',
              '#4b9bff',
              '#4b9bff',  
            ],
            borderWidth: 1,
            
          }]
      },
      options: {
          scales: {
              yAxes: [{
                  ticks: {
                      beginAtZero: true
                  }
              }]
          }
      }
    })
  })

  return (
    <Container>
      <Canvas ref={chartContentRef}></Canvas>
    </Container>
  )
}

export default ChartBar;