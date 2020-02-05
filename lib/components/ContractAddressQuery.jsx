import gql from 'graphql-tag'
import { useQuery } from '@apollo/react-hooks'

export function ContractAddressQuery({ children, contractName }) { 
  const contractQuery = gql`
    query contractQuery($contractName: String!) {
      contract: contract(name: $contractName) @client
    }
  `

  const { loading, data, error } = useQuery(contractQuery, {
    variables: { contractName }
  })
  
  if (loading) {
    return <>Loading contract ...</>
  } else if (error) {
    console.error(error)
    return null
  } else {
    return children({
      contractAddress: data.contract.address
    })
  }
}
