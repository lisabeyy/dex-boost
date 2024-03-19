
import { NextResponse } from 'next/server'
import gql from 'graphql-tag'
import { execute } from '../../../../.graphclient'
import { InformationCircleIcon } from "@heroicons/react/20/solid";
import DataTable from "./datatable";
import { formatNumber } from '@/lib/utils/numbers';



export type Pool = {
  id: string,
  symbol: string,
  pair: string,
  feeTier: string,
  liquidity: number,
  txCount: number,
  volumeUSD: number,
  createdAt: string,
}


export default async function PoolsList() {


  const poolsV3 = gql`
    query pools {
      pools(first: 100, orderBy: createdAtTimestamp , orderDirection: desc, where: { volumeUSD_gt: 1999999  }) {
        id
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

  const result = await execute(poolsV3, {})
  let data: Pool[] = [];
  data = result?.data?.pools.map((pool: any) => {
    return {
      id: pool.id,
      link: "https://etherscan.io/address/" + pool.id,
      symbol: pool.token0.symbol + ' / ' + pool.token1.symbol,
      pair: pool.token0.name + '/' + pool.token1.name,
      feeTier: pool.feeTier / 10000 + '%',
      totalValueLockedUSD: formatNumber(parseFloat(pool.totalValueLockedUSD)),
      txCount: pool.txCount,
      volumeUSD: formatNumber(pool.volumeUSD),
      createdAt: new Date(pool.createdAtTimestamp * 1000).toLocaleString()
    };
  });


  return (

    <>
      <h3 className='mb-4'>Pools List</h3>
      <p className='px-8 mb-2 text-large'>What you see here are the pools created in the last 6 months on Uniswap v3 with a volume superior to 2 million USD, a TVL superior to 100k and a minimum of 500 transactions.</p>
      <p className='px-8 mb-4 text-large'>
        Click on a pair to open the pool on Uniswap
      </p>
      {data && data.length > 0 &&
        <>
          <DataTable />

        </>
      }
    </>


  );
};
