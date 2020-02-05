import dynamic from 'next/dynamic'

import { LoadingDots } from 'lib/components/LoadingDots'

export const DynamicFortmaticWrapper = dynamic(
  () => import('lib/components/FortmaticWrapper'),
  {
    loading: () => <LoadingDots />,
    ssr: false,
  }
)