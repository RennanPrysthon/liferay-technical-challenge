import React, { useEffect, useReducer, useRef, useState } from 'react';
import Chart from 'chart.js';

import { 
  Container, 
  Canvas, 
  Header,
  Tab,
  Title,
  Count
} from './styles';
import getIssuesFromRepo from '../../api/getIssuesFromRepo';
import getIssuesAndPullCount from '../../api/getIssuesAndPullCount';
import getPullFromRepo from '../../api/getPullFromRepo';

interface Props {
  repoUrl: string
}

const initialState = { pull: true, issues: false }

function reducer(state: { pull: boolean, issues: boolean } = initialState, action: { type: string }) {
  switch (action.type) {
    case 'issue':
      return {
        pull: false,
        issues: true
      }
    case 'pull':
      return {
        pull: true,
        issues: false
      }
    default:
      return initialState
  }
}

const ChartLinear: React.FC<Props> = ({ repoUrl }) => {
  const [activeTab, dispatch]  = useReducer(reducer, initialState);
  const [countPullRequests, setCountPullRequests] = useState(0)
  const [countIssues, setCountIssues] = useState(0)
  const chartContentRef = useRef<HTMLCanvasElement>(null);
  
  useEffect(() => {
    (async () => {
      const [issueCount, pullCount] = await getIssuesAndPullCount(repoUrl);
      setCountIssues(issueCount);
      setCountPullRequests(pullCount);  
    })()
  }, [repoUrl])

  function fillPulls(result: PullResult[]) {
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
            }, {
              label: 'Merged',
              borderColor: '##b20bff',
              data: result.map(r => r.merged),
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
  }

  function fillIssues(result: IssueResult[]) {
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
  }

  useEffect(() => {
    (async () => {
      if (activeTab.issues) {
        const result =  await getIssuesFromRepo(repoUrl)
        fillIssues(result);
      } else {
        const result = await getPullFromRepo(repoUrl);
        fillPulls(result);
      }
    })()
  }, [activeTab])

  return (
    <Container>
      <Header>  
        <Tab isActive={activeTab.pull} onClick={() => dispatch({ type: 'pull' })}>
          <div>
            <h3>Pull Requests</h3>
            <span>{countPullRequests}</span>
          </div>
        </Tab>
        <Tab isActive={activeTab.issues} onClick={() => dispatch({ type: 'issue' })}>
          <div>
            <h3>Issues</h3>
            <span>{countIssues}</span>
          </div>
        </Tab>
      </Header>
      <Canvas ref={chartContentRef}></Canvas>
    </Container>
  )
}

export default ChartLinear;