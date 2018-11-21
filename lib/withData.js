import withApollo from 'next-with-apollo'
import ApolloBoostClient from 'apollo-boost'

import { endpoint } from '../config'

function createClient({ headers }) {
  return new ApolloBoostClient({
    // connectToDevTools: true,
    uri: process.env.NODE_ENV === 'development' ? endpoint : endpoint,
    request: operation => {
      operation.setContext({
        fetchOptions: {
          credentials: 'include',
        },
        headers,
      })
    },
  })
}

export default withApollo(createClient)
