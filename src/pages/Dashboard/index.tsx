import React, { useState } from 'react';
import { useToasts } from 'react-toast-notifications'

import api from '../../api';

import ChartContainer from '../../components/ChartContainer';
import ChartBar from '../../components/ChartBar';
import ShowDate from '../../components/ShowDate';
import ChartLinear from '../../components/ChartLinear';

import { Container, ChartContainers, Header, Title, Subtitle} from './styles';

const Dashboard: React.FC = () => {
  const { addToast } = useToasts();
  
  const [loading, setLoading] = useState(false);
  
  const [organizationName,setOrganizationName] = useState('Liferay');
  const [repositoryName, setRepositoryName] = useState('liferay-portal');
  
  const [repositories, setRepositories] = useState<Repository[]>([]);
  const [repository, setRepository] = useState<Repository>();

  async function getOrganizationRepos() {
    if (loading) return;
    try {
      const { data } = await api.get<Repository[]>(`/orgs/${organizationName}/repos`);
      setRepositories(data) 
      loadRepository();
      setLoading(false)
    } catch (error) {
      setLoading(false)

      if (error?.response?.status === 404) {
        addToast(`Organização ${organizationName} não encontrada`, {
          appearance: 'error',
          autoDismiss: true,
        })
        return;
      }
      
      addToast('Ocorreu um err ao consultar a organização, tente novamente mais tarde', {
        appearance: 'error',
        autoDismiss: true,
      })
    }
  }

  function loadRepository(repoName: string = repositoryName) {
    if (repoName === '' || repoName === null || repoName === undefined || repositories === undefined || repositories === null || repositories.length < 1 ) {
      return;
    }
    
    let repo = repositories.find(repo => repo.name === repoName)

    if (repo === undefined || repo === null) {
      addToast(`Repositorio ${repoName} desta organização não foi encontrado`, {
        appearance: 'error',
        autoDismiss: true,
      })
      return;
    }

    setRepository(repo);
  }

  return (
    <Container>
      <Header>
        <Title value={organizationName} onChange={(ev) => setOrganizationName(ev.target.value)} onBlur={() => getOrganizationRepos()}/>
        <Subtitle value={repositoryName} onChange={(ev) => setRepositoryName(ev.target.value)} onBlur={(ev) => loadRepository(ev.target.value)}/>     
      </Header>

      {
        !loading && !!repository &&
        <div>
          <ChartContainers type="big">
            <ChartContainer
              title="Average Merge Time by Pull Request Size"
              type="big"
            >
              <ChartBar />
            </ChartContainer>
          </ChartContainers>

          <ChartContainers type="small">
            <ChartContainer
              title="Average Pull Request Merge Time"
              type="small"
            >
              <ShowDate type="pull" url={repository.url}/>
            </ChartContainer>

            <ChartContainer
              title="Average Issue Close Time"
              type="small"
            >
              <ShowDate type="issue" url={repository.url}/>
            </ChartContainer>          
          </ChartContainers>

          <ChartContainers type="big">
            <ChartContainer
              title="Average Merge Time by Pull Request Size"
              type="big"
            >
              <ChartLinear repoUrl={repository.url} />
            </ChartContainer>
          </ChartContainers>
        </div>
      } 
    </Container>
  )
}

export default Dashboard;
