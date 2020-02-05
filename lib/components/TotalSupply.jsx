import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';

const QUERY = gql`
  {
    totalSupply: call(name: "Pod", fn: "totalSupply") @client
  }
`;

export function TotalSupply() {
  const { loading, data, error } = useQuery(QUERY)

  let result = null
  
  if (loading) {
    // result = <div>Loading...</div>
  } else if (error) {
    console.error(error)
    result = <>
      <strong>Total supply query error:</strong>
      <br />{error.message}
    </>
  } else {
    result = <>
      <strong>Total Supply:</strong>
      <br />{data.totalSupply.toString()}
    </>
  }

  return result
}