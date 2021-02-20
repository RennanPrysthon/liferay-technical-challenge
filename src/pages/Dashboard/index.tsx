import React, { useState } from 'react';
import { useToasts } from 'react-toast-notifications'

import api from '../../api';

import { Container, ChartContainers, Header, Title, Subtitle} from './styles';

const Dashboard: React.FC = () => {
  const { addToast } = useToasts();
  
  const [loading, setLoading] = useState(false);
  
  const [organizationName,setOrganizationName] = useState('Rocketseat');
  const [repositoryName, setRepositoryName] = useState('teste');
  
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

      if (error.response.status = 404) {
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
    if (repoName === '' || repoName === null || repoName === undefined) {
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

      {!loading && 
        <ChartContainers>

        </ChartContainers>
      }
    </Container>
  )
}

export default Dashboard;
