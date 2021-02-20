import React, { useEffect, memo, useState } from 'react';
import getIssuesCloseAverageTime from '../../api/getIssuesCloseAverageTime';
import getPullsCloseAverageTime from '../../api/getPullsCloseAverageTime';

import { Container } from './styles';

interface Props {
  type: 'issue' | 'pull';
  url: string;
}

const ShowDate: React.FC<Props> = ({ type, url }) => {
  const [loading, setLoading] = useState(true);
  const [date, setDate] = useState('');
  
  useEffect(() => {
    (async () => {
      
      var date = type === 'issue' ? await getIssuesCloseAverageTime(url) : await getPullsCloseAverageTime(url)
      setLoading(false);
      setDate(date)
    
    })()
    
  }, [url])

  return (
    <Container>
      {!loading && date}
    </Container>
  )
  
}

export default ShowDate;