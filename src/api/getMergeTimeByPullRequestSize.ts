import api from '.'


async function fetch(url:string)  {
  try {
    const { data } = await api.get<IssueData[]>(url + '');
    return data;
  } catch(error) {
    return [];
  }
}

export default async function getMergeTimeByPullRequestSize(url: string): 
Promise<[]>
{
  const data = await fetch(url);

  var smallRequestTimeAverage = [];
  var mediumRequestTimeAverage = [];
  var largeRequestTimeAverage = [];

  return []
}
