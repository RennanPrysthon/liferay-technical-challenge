import React, { useEffect, useRef, useState } from 'react';
import Chart from 'chart.js';

import { Container, Canvas} from './styles';
import getPullDetailsFromRepo from '../../api/getPullDetailsFromRepo';
interface Props {
  url: string;
}

const ChartBar: React.FC<Props> = ({ url }) => {
  const chartContentRef = useRef<HTMLCanvasElement>(null);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    if (loading) return;
    (async () => {
      setLoading(true);

      const data = await getPullDetailsFromRepo(url);
      
      new Chart(chartContentRef.current, {
        type: 'bar',
        data: {
            labels: ['Small: ' + data.small.count, 'Medium: '  + data.medium.count, 'Large: ' + data.higher.count],
            datasets: [{
              label: 'Hours: ',
              data: [data.small.average, data.medium.average, data.higher.average],
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
      setLoading(false);
    })()
  }, [url])

  return (
    <Container>
      <Canvas ref={chartContentRef}></Canvas>
    </Container>
  )
}

export default ChartBar;