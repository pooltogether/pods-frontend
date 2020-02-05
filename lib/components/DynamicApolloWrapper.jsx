import dynamic from 'next/dynamic'

import { LoadingDots } from 'lib/components/LoadingDots'

export const DynamicApolloWrapper = dynamic(
  () => import('lib/components/ApolloWrapper'),
  {
    loading: () => <LoadingDots />,
    ssr: false,
  }
)