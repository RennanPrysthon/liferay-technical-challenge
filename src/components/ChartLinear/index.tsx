import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js';

import { Container, Canvas} from './styles';

const ChartLinear: React.FC = () => {
  const chartContentRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    new Chart(chartContentRef.current, {
      type: 'line',
      data: {
        labels: ['Red', 'Blue', 'Des', 'Red', 'Blue', 'Des'],

          datasets: [{
            label: 'Opened',
            borderColor: '#43c600',
            data: [12, 19, 22, 33, 33, 44, 12],
            borderWidth: 1,
            fill: false
          },{
            label: 'Closed',
            borderColor: '#f53902',
            data: [12, 19, 22, 33, 33, 44, 12],
            borderWidth: 1,
            fill: false
          }]
      },
      options: {
        scales: {
            yAxes: [{
                stacked: true
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

export default ChartLinear;