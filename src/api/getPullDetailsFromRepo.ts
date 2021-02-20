import api from '.'
import moment from "moment";

async function fetch(url:string)  {
  try {
    const { data } = await api.get<PullDetails[]>(url + '/pulls?state=all');
    return data;
  } catch(error) {
    return [];
  }
}

async function fetchSelfRepo(url:string): Promise<PullDetails> {
  try {
    const { data } = await api.get<PullDetails>(url);
    return data;
  } catch(error) {
    return {} as PullDetails;
  }
}

function getAverageMergedTime(data: PullDetails[] = []) {

  var dateList:number[] = []
  
  data.forEach(( value ) => {
    if (
      value.merged_at !== null && value.merged_at !== undefined &&
      value.created_at !== null && value.created_at !== undefined
    ) {
      var date1 = moment(value.merged_at);
      var date2 = moment(value.created_at);

      var duration = moment.duration(moment(date1).diff(moment(date2)));
      dateList.push(duration.asMilliseconds());
    } else {
      dateList.push(0)
    }
  })

  var value = dateList.reduce((val1, val2) => {
    return val1 + val2;
  })

  value = value / dateList.length;
  
  var dateDuration = moment(value);

  return data === [] ? 0 : dateDuration.get("hours") ;
}

export default async function getPullDetailsFromRepo(url: string): 
Promise<PullDetailsResponse>
{
  var data = await fetch(url);
  var response: PullDetails[] = [];
  
  for (let index = 0; index < data.length; index++) {
    var element = await fetchSelfRepo(data[index].url);
    element.totalChanges = element.additions + element.deletions;
    response.push(element);
  }

  var maximumSizeLength = response.filter(value => value.totalChanges > 1000);
  var mediumSizeLength = response.filter(value => value.totalChanges > 100);
  var smallSizeLength = response.filter(value => value.totalChanges < 100);

   var result:PullDetailsResponse = {
    higher: {
      count: maximumSizeLength.length,
      average: getAverageMergedTime(maximumSizeLength)
    },
    medium: {
      count: mediumSizeLength.length,
      average: getAverageMergedTime(mediumSizeLength),
    },
    small: {
      count: smallSizeLength.length,
      average: getAverageMergedTime(smallSizeLength),
    }
   }

  return result;
}

