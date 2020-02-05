import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';

const QUERY = gql`
  {
    pod: contract(name: "Pod") @client
  }
`;

export function PodAddress(){ 
  const { loading, data, error } = useQuery(QUERY)
  
  let jsx = null

  if (loading) {
    // return <div>Loading...</div>
  } else if (error) {
    console.error(error)
    jsx = <>
      <strong>PodAddress Error:</strong>
      <br />{error.message}
    </>
  } else {
    jsx = <>
      <strong>Pod contract at:</strong>
      <br />{data.pod.address}
    </>
  }

  return jsx
}
