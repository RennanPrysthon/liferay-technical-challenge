import api from '.'
import moment from "moment";

async function fetch(url:string)  {
  try {
    const { data } = await api.get<IssueData[]>(url + '/issues?state=all');
    return data;
  } catch(error) {
    return [];
  }
}

export default async function getIssuesFromRepo(url: string): 
Promise<IssueResult[]>
{
  const data = await fetch(url);

  var dateLabels = data.map(value => {
    return value.created_at.split('T')[0];
  })
  dateLabels = dateLabels.filter((value, index) => dateLabels.indexOf(value) === index);
  dateLabels = dateLabels.sort();
  
  var result: IssueResult[] = [];

  dateLabels.forEach(label => {
  
    var list = data.filter((value) => value.created_at.split('T')[0] === label)

    result.push({
      date: label,
      closed: list.filter(val => val.state === 'closed').length,
      opened: list.filter(val => val.state === 'open').length
    })
  })
  
  return result
}
