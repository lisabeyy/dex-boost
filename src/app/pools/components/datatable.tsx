import React from "react";
import {Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, getKeyValue} from "@nextui-org/table";
import {Pagination, Spinner,Input, Button,} from "@nextui-org/react";
import {useAsyncList} from "@react-stately/data";
import { formatNumber } from '@/lib/utils/numbers'

export default function DataTable() {
  const [page, setPage] = React.useState(1);
  const [pages, setPages] = React.useState<number>(1);
  const [isLoading, setIsLoading] = React.useState(true);
  const [filterValue, setFilterValue] = React.useState("");



  const rowsPerPage = 10;
  const start = (page - 1) * rowsPerPage;
  const end = start + rowsPerPage;

  let list = useAsyncList({
    async load() {
      let res = await fetch('/api/pools', { next: { revalidate: 3600 }});
      let json = await res.json();
      setIsLoading(false);
      setPages(Math.ceil(json.length / rowsPerPage));
  
      return {
        items: json
      };
    },
    async sort({items, sortDescriptor}) {
      return {

        items: items.sort((a, b) => {
          console.log('items', items);
          let first = a[sortDescriptor.column];
          let second = b[sortDescriptor.column];
          let cmp = (parseInt(first) || first) < (parseInt(second) || second) ? -1 : 1;

          if (sortDescriptor.direction === "descending") {
            cmp *= -1;
          }

          return cmp;
        }),
      };
    },
  });

 
  const items = React.useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;
    return list.items.slice(start, end);
  }, [page, rowsPerPage, list.items]);


  return (
    <Table 
      aria-label="Pools table with pagination"
      sortDescriptor={list.sortDescriptor}
      onSortChange={list.sort}
      bottomContent={
        <div className="flex w-full justify-center">
          <Pagination
            isCompact
            showControls
            showShadow
            color="primary"
            page={page}
            total={pages}
            onChange={(page: any) => setPage(page)}
          />
        </div>
      }
      classNames={{
        wrapper: "min-h-[222px]",
      }}
    >
      <TableHeader>
        <TableColumn key="symbol" allowsSorting>Pool Name</TableColumn>
        <TableColumn key="feeTier" >Fee Tier</TableColumn>
        <TableColumn key="totalValueLockedUSD" allowsSorting>Total Value Locked</TableColumn>
        <TableColumn key="volumeUSD" allowsSorting>Volume USD</TableColumn>
        <TableColumn key="txCount" allowsSorting>Trx Count</TableColumn>
        <TableColumn key="createdAt" allowsSorting>Creation Date</TableColumn>
      </TableHeader>

      <TableBody 
        items={items} 
        isLoading={isLoading}
        loadingContent={<Spinner label="Loading..." />}
      >
        {(item: any) => (
           <TableRow key={item.id}>
           {(columnKey: any) => {
             switch(columnKey) {
               case 'symbol':
                 return <TableCell><a href={item.link} target="_blank">{getKeyValue(item, columnKey)}</a></TableCell>;
               case 'feeTier':
                 // Add your custom rendering for feeTier here
                 return <TableCell>{getKeyValue(item, columnKey)}</TableCell>;
               case 'totalValueLockedUSD':
                 // Add your custom rendering for totalValueLockedUSD here
                 return <TableCell>{formatNumber(parseFloat(getKeyValue(item, columnKey)))}</TableCell>;
               case 'volumeUSD':
                 // Add your custom rendering for volumeUSD here
                 return <TableCell>{formatNumber(getKeyValue(item, columnKey))}</TableCell>;
               case 'txCount':
                 // Add your custom rendering for txCount here
                 return <TableCell>{getKeyValue(item, columnKey)}</TableCell>;
               case 'createdAt':
                 // Add your custom rendering for createdAt here
                 return <TableCell>{ new Date(getKeyValue(item, columnKey) * 1000).toLocaleString()}</TableCell>;
               default:
                 return <TableCell>{getKeyValue(item, columnKey)}</TableCell>;
             }
           }}
         </TableRow>
        )}
      </TableBody>
    </Table>
  );
}
