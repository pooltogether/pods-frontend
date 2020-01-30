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
    result = <span>Loading...</span>
  } else if (error) {
    console.error(error)
    result = <span>Query Error: {error.message}</span>
  } else {
    result = <span>Total Supply: {data.totalSupply.toString()}</span>
  }

  return result
}