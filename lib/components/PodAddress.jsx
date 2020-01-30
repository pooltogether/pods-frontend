import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';

const QUERY = gql`
  {
    pod: contract(name: "Pod") @client
  }
`;

export function PodAddress(){ 
  const { loading, data, error } = useQuery(QUERY)

  if (loading) {
    return <div>Loading...</div>
  } else if (error) {
    console.error(error)
    return <div>PodAddress Error: {error.message}</div>
  } else {
    return (
      <div>Pod contract at {data.pod.address}</div>
    )
  }
}
