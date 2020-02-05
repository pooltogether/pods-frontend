import { useQuery } from '@apollo/react-hooks'

import { poolTokenUserQuery } from 'lib/queries/poolTokenUserQuery'

export function NavUserBalance({ poolTokenAddress, userAddress }) { 
  let jsx = null

  const { loading, data, error } = useQuery(poolTokenUserQuery, {
    variables: { 
      poolTokenAddress,
      userAddress
    }
  })
  
  if (loading) {
    jsx = 'Loading balance ...'
  } else if (error) {
    console.error(error)
    jsx = 'Error retrieving balance ...'
  } else {
    const tokenBalance = data.balanceOf.toString()
    
    jsx = <>
      <span className='sm:hidden'>
        {tokenBalance} plDai
      </span>
      <span className='hidden sm:block'>
        You have {tokenBalance} plDai
      </span>
    </>
  }

  return <>
    <span
      className='flex justify-end text-cyan-400 hover:text-cyan-200 trans'
    >
      {jsx}      
    </span>
  </>
}
