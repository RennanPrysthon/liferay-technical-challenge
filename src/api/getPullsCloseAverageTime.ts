import api from '.'
import moment from "moment";

async function fetch(url:string)  {
  try {
    const { data } = await api.get<IssueData[]>(url + '/pulls?state=all');
    return data;
  } catch(error) {
    return [];
  }
}

export default async function getPullsCloseAverageTime(url: string): 
Promise<string>
{
  const data = await fetch(url);
  var dateList:number[] = []
  
  data.forEach(( value ) => {
    if (
      value.closed_at !== null && value.closed_at !== undefined &&
      value.created_at !== null && value.created_at !== undefined
    ) {
      var date1 = moment(value.closed_at);
      var date2 = moment(value.created_at);

      var duration = moment.duration(moment(date1).diff(moment(date2)));
      dateList.push(duration.asMilliseconds());
      
    }
  })

  var value = dateList.reduce((val1, val2) => {
    return val1 + val2;
  })
  value = value / dateList.length;
  
  var dateDuration = moment(value);

  var days = dateDuration.get("days") === 1 ? dateDuration.get("days") +"day " : dateDuration.get("days") + "days "
  return days+dateDuration.get("hours") +"h"+ dateDuration.get("minutes") +"m"+ dateDuration.get("seconds")+"s"
}