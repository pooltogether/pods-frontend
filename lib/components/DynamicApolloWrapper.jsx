import dynamic from 'next/dynamic'

import { LoadingSpinner } from 'lib/components/LoadingSpinner'

export const DynamicApolloWrapper = dynamic(
  () => import('lib/components/ApolloWrapper'),
  {
    loading: () => <LoadingSpinner />,
    ssr: false,
  }
)