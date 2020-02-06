export function refetchQuery (query) {
  if (query) {
    // console.log(`Running refetch() !`)
    query.refetch()
  } else {
    console.log(`Query not available for refetch at execution time?`, query)
  }
}
