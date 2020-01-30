import { DynamicApolloWrapper } from 'lib/components/DynamicApolloWrapper'
import { DynamicFortmaticWrapper } from 'lib/components/DynamicFortmaticWrapper'
import { TotalSupply } from 'lib/components/TotalSupply'
import { ConnectFortmatic } from 'lib/components/ConnectFortmatic'
import { PodAddress } from 'lib/components/PodAddress'

// This page has no blocking data requirements
// it'll be rendered as static HTML at build time
function HomePage() {
  return (
    <DynamicFortmaticWrapper>
      <DynamicApolloWrapper>
        <div>Welcome to Next.js!</div>
        <PodAddress />
        <TotalSupply />
        <ConnectFortmatic />
      </DynamicApolloWrapper>
    </DynamicFortmaticWrapper>
  )
}

export default HomePage