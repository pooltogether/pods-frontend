import dynamic from 'next/dynamic'

export const DynamicFortmaticWrapper = dynamic(
  () => import('lib/components/FortmaticWrapper'),
  {
    loading: () => 'loading dynamic Fortmatic wrapper...',
    ssr: false,
  }
)