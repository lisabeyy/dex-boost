import { ApolloClient, InMemoryCache, gql } from '@apollo/client'
import { NextResponse } from 'next/server'



export async function GET(request: Request) {
  const APIURL = 'https://api.thegraph.com/subgraphs/name/uniswap/uniswap-v3'

  const tokensQuery = `
    query {
      {
        pools(first: 100, orderBy: createdAtTimestamp, orderDirection:asc) {
          id
          createdAtTimestamp
          token0 {
            name,
            totalValueLockedUSD
            
          }
          token1 {
            name
            totalValueLockedUSD
          
          }
          token0Price
          token1Price
          txCount
          volumeUSD
          totalValueLockedUSD
         
        }
      
      }
    }
  `
  
  const client = new ApolloClient({
    uri: APIURL,
    cache: new InMemoryCache(),
  })
  
  client
    .query({
      query: gql(tokensQuery),
    })
    .then((data) => {
      
      return new NextResponse(JSON.stringify(data), {
        status: 200
      })
    })
    .catch((err) => {
      return new NextResponse(JSON.stringify({error: err}), {
        status: 500
      })
    })

}


