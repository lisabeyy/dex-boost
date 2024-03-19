import { NextResponse } from 'next/server'
import gql from 'graphql-tag'
import { execute } from '../../../../.graphclient'
import { formatNumber } from '@/lib/utils/numbers'


type Pool = {
  id: string,
  symbol: string,
  pair: string,
  feeUSD: number,
  feeTier: string,
  liquidity: number,
  txCount: number,
  volumeUSD: number,
  createdAt: string,
}


export async function GET(request: Request) {

  const date = new Date();
  date.setMonth(date.getMonth() - 6);
  const timestamp = Math.floor(date.getTime() / 1000);
  const poolsV3 = gql`
    query pools {
        pools(first: 500, orderBy: createdAtTimestamp , orderDirection: desc, where: { and :[{ volumeUSD_gt: 1999999 } , { totalValueLockedUSD_gt: 100000 }, { txCount_gte: 500 }, {createdAtTimestamp_gte: ${timestamp}}] } ) {
        id
        feesUSD
        createdAtTimestamp
        feeTier
        sqrtPrice
        totalValueLockedUSD
        token0 {
          symbol
          name
          totalSupply
          totalValueLockedUSD
        }
        token1 {
          symbol
          name
          totalSupply
          totalValueLockedUSD
        }
        txCount
        volumeUSD
      }
    }
  `

  let data: Pool[] = [];


  try {
   const result = await execute(poolsV3, {});
      data = result?.data?.pools.map((pool: any) => {
        return {
          id: pool.id,
          link: "https://info.uniswap.org/#/pools/" + pool.id,
          symbol: pool.token0.symbol + '/' + pool.token1.symbol,
          feeUSD: pool.feesUSD,
          pair: pool.token0.name + '/' + pool.token1.name,
          feeTier: pool.feeTier / 10000 + '%',
          totalValueLockedUSD: pool.totalValueLockedUSD,
          txCount: pool.txCount,
          volumeUSD: pool.volumeUSD,
          createdAt: pool.createdAtTimestamp
        };
      });
  
  
      return new NextResponse(JSON.stringify(data), {
        status: 200
      })

  } catch (error) {
    return new NextResponse(JSON.stringify({error: error}), {
      status: 500
    })
  }

}


