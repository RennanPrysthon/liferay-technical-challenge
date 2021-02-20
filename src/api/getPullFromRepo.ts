import api from '.'
import moment from "moment";

async function fetch(url:string)  {
  try {
    const { data } = await api.get<PullData[]>(url + '/pulls?state=all');
    return data;
  } catch(error) {
    return [];
  }
}

export default async function getPullFromRepo(url: string): 
Promise<PullResult[]>
{
  const data = await fetch(url);

  var dateLabels = data.map(value => {
    return value.created_at.split('T')[0];
  })
  dateLabels = dateLabels.filter((value, index) => dateLabels.indexOf(value) === index);
  dateLabels = dateLabels.sort();
  
  var result: PullResult[] = [];

  dateLabels.forEach(label => {
  
    var list = data.filter((value) => value.created_at.split('T')[0] === label)

    result.push({
      date: moment(label).format('MM ddd'),
      closed: list.filter(val => val.state === 'closed').length,
      opened: list.filter(val => val.state === 'open').length,
      merged: list.filter(val => val.merged_at !== null).length
    })
  })
  
  return result
}
