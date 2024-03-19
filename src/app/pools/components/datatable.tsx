import React from "react";
import {Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, getKeyValue} from "@nextui-org/table";
import {Pagination} from "@nextui-org/react";


export default function DataTable(poolsData: any) {
  const [page, setPage] = React.useState(1);
  const rowsPerPage = 10;

  const pages = Math.ceil(poolsData.data.length / rowsPerPage);

  const items = React.useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    console.log('data', poolsData.data);
    return poolsData.data.slice(start, end);
  }, [page, poolsData.data]);

  console.log('items', items);

  return (
    <Table 
      aria-label="Pools table with pagination"
      bottomContent={
        <div className="flex w-full justify-center">
          <Pagination
            isCompact
            showControls
            showShadow
            color="secondary"
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
        <TableColumn key="symbol">Pool Name</TableColumn>
        <TableColumn key="feeTier">Fee Tier</TableColumn>
        <TableColumn key="totalValueLockedUSD">Total Value Locked</TableColumn>
        <TableColumn key="volumeUSD">Volume USD</TableColumn>
        <TableColumn key="txCount">Trx Count</TableColumn>
        <TableColumn key="createdAt">Creation Date</TableColumn>
      </TableHeader>
      <TableBody items={items}>
        {(item : any) => (
          <TableRow key={item.id}>
            {(columnKey: any) => 
              columnKey === 'symbol' ? 
              <TableCell><a href={item.link}>{getKeyValue(item, columnKey)}</a></TableCell> :
              <TableCell>{getKeyValue(item, columnKey)}</TableCell>
            }
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}
