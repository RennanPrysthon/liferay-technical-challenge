import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js';

import { Container, Canvas} from './styles';
import getIssuesFromRepo from '../../api/getIssuesFromRepo';

interface Props {
  repoUrl: string
}

const ChartLinear: React.FC<Props> = ({ repoUrl }) => {
  const chartContentRef = useRef<HTMLCanvasElement>(null);
  
  useEffect(() => {
    (async () => {
      const result = await getIssuesFromRepo(repoUrl);
      
      new Chart(chartContentRef.current, {
        type: 'line',
        steppedLine: true,
        data: {
          labels: result.map(r => r.date),
          datasets: [
              {
                label: 'Closed',
                borderColor: '#f53902',
                data: result.map(r => r.closed),
                fill: false,
              },
              {
                label: 'Opened',
                borderColor: '#43c600',
                data: result.map(r => r.opened),
                fill: false,
              }
            ]
          },
          options: {
            responsive: true,
            plugins: {
              title: {
                display: true,
                text: 'Chart.js Line Chart - Logarithmic'
              }
            },
            scales: {
              x: {
                display: true,
              },
              y: {
                display: true,
                type: 'logarithmic',
              }
            }
          }
      })
    })()
  })

  return (
    <Container>
      <Canvas ref={chartContentRef}></Canvas>
    </Container>
  )
}

export default ChartLinear;