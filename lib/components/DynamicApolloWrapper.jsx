import dynamic from 'next/dynamic'

export const DynamicApolloWrapper = dynamic(
  () => import('lib/components/ApolloWrapper'),
  {
    loading: () => 'loading dynamic apollo wrapper...',
    ssr: false,
  }
)