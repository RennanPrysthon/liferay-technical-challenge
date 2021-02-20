import api from '.'

async function fetchIssuesCount(url:string)  {
  try {
    const { data } = await api.get<IssueData[]>(url + '/issues?state=all');
    return data;
  } catch(error) {
    return [];
  }
}

async function fetchPullCount(url:string)  {
  try {
    const { data } = await api.get<IssueData[]>(url + '/pulls?state=all');
    return data;
  } catch(error) {
    return [];
  }
}

export default async function getIssuesAndPullCount(url: string):  Promise<[issueCount: number, pullCount: number]>
{
  const issuesCount = await fetchIssuesCount(url);
  const pullCount = await fetchPullCount(url);

  return [issuesCount.length, pullCount.length]
}