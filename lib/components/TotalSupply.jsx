import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';

const QUERY = gql`
  {
    totalSupply: call(name: "Pod", fn: "totalSupply") @client
  }
`;

export function TotalSupply() {
  const { loading, data, error } = useQuery(QUERY)

  let result = ''
  if (loading) {
    result = <div>Loading...</div>
  } else if (error) {
    console.error(error)
    result = <div>Query Error: {error.message}</div>
  } else {
    result = <div>Total Supply: {data.totalSupply.toString()}</div>
  }

  return result
}