
import { NextResponse } from 'next/server'
import gql from 'graphql-tag'
import { execute } from '../../../../.graphclient'
import { ChevronUpIcon } from "@heroicons/react/20/solid";
import DataTable from "./datatable";
import { formatNumber } from '@/lib/utils/numbers';



type Pool = {
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


  const myQuery = gql`
    query pools {
      pools(first: 100, orderBy: createdAtTimestamp , orderDirection: desc) {
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

  const result = await execute(myQuery, {})
  let data: Pool[] = [];
  data = result?.data?.pools.map((pool: any) => {
    return {
      id: pool.id,
      link: "https://etherscan.io/address/" + pool.id,
      symbol: pool.token0.symbol + '/' + pool.token1.symbol,
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

    {data && data.length > 0 && 
        <>
        <DataTable data={data}  />
        
        </>
    }
    </>


  );
};
