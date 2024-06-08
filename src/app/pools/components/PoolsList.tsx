
import gql from "graphql-tag"
import { execute } from "../../../../.graphclient"
import DataTable from "./datatable";
import { formatNumber } from "@/lib/utils/numbers";



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



  return (

    <>
      <h3 className="mb-4">Pools List</h3>
      <p className="px-8 mb-2 text-large">What you see here are the pools created in the last 6 months on Uniswap v3 with a volume superior to 2 million USD, a TVL superior to 100k and a minimum of 500 transactions.</p>
      <p className="px-8 mb-4 text-large">
        Click on a pair to open the pool on GeckoTerminal
      </p>
        <>
          <DataTable />

        </>


       
    </>


  );
};
