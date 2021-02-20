import React, { useEffect, useState } from 'react';
import { useToasts } from 'react-toast-notifications'

import api from '../../api';

import ChartContainer from '../../components/ChartContainer';
import ChartBar from '../../components/ChartBar';
import ShowDate from '../../components/ShowDate';
import ChartLinear from '../../components/ChartLinear';

import { 
  Container, 
  Header, 
  Title, 
  Subtitle,
  GridContent,
  GridLarge,
  GridSmall,
  GridItem
} from './styles';

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

  useEffect(() => {
    getOrganizationRepos();
  }, [])

  return (
    <Container>
      <Header>
        <Title value={organizationName} onChange={(ev) => setOrganizationName(ev.target.value)} onBlur={() => getOrganizationRepos()}/>
        <Subtitle value={repositoryName} onChange={(ev) => setRepositoryName(ev.target.value)} onBlur={(ev) => loadRepository(ev.target.value)}/>     
      </Header>

      {
        !loading && !!repository &&
        <div>
          <GridContent>
            <GridLarge>
              <ChartContainer
                title="Average Merge Time by Pull Request Size"
              >
                <ChartBar url={repository.url}/>
              </ChartContainer>
            </GridLarge>
            <GridSmall>
              <GridItem>
                <ChartContainer
                  title="Average Pull Request Merge Time"
                >
                  <ShowDate type="pull" url={repository.url}/>
                </ChartContainer>
              </GridItem>
              <GridItem>
                <ChartContainer
                  title="Average Issue Close Time"
                >
                  <ShowDate type="issue" url={repository.url}/>                  
                </ChartContainer>          
              </GridItem>
            </GridSmall>
            <GridLarge>
              <ChartContainer
                title="Month Summary"
              >      
                <ChartLinear repoUrl={repository.url} />
              </ChartContainer>          
            </GridLarge>
          </GridContent>
        </div>
      } 
    </Container>
  )
}

export default Dashboard;
