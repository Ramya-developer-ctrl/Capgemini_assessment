import {
    MantineReactTable,
    useMantineReactTable,
  } from 'mantine-react-table';
  import '@mantine/core/styles.css';
import '@mantine/dates/styles.css';
import 'mantine-react-table/styles.css';
import PropTypes from 'prop-types';
import { CUSTOM_TABLE, MONTHS, YEARS } from '../constants/constants';
import { Select } from '@mantine/core';

const TransactionTable=({data,onRowClick})=>{
    const columns=[
        {
          accessorKey: 'name', //normal accessorKey
          header: CUSTOM_TABLE.NAME,
          enableFilters: false,
        },
        {
          accessorKey: 'amount', //normal accessorKey
          header: CUSTOM_TABLE.AMOUNT,
          enableFilters: false,
        },
        {
          accessorKey: 'date', //normal accessorKey
          header: CUSTOM_TABLE.DATE,
          filterPlaceholder: 'Filter by Month/Year',
          // Customizing the filter UI for the date column
          Filter: ({ column }) => (
            <div title="" style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
              <Select
                placeholder="Month"
                data={MONTHS}
                value={column.getFilterValue()?.month || ''}
                onChange={(val) => 
                  column.setFilterValue((old) => ({ ...old, month: val }))
                }
                size="xs"
                clearable
              />
              <Select
                placeholder="Year"
                data={YEARS}
                value={column.getFilterValue()?.year || '2025'}
                onChange={(val) => 
                  column.setFilterValue((old) => ({ ...old, year: val }))
                }
                size="xs"
              />
            </div>
          ),
          // Custom filter logic to match both Month and Year
          filterFn: (row, id, filterValue) => {
            const rowDate = new Date(row.getValue(id));
            const rowMonth = rowDate.toLocaleString('default', { month: 'long' });
            const rowYear = rowDate.getFullYear().toString();

            const monthMatch = !filterValue.month || rowMonth === filterValue.month;
            const yearMatch = !filterValue.year || rowYear === filterValue.year;

            return monthMatch && yearMatch;
          },
        },
      ]
  
      const table = useMantineReactTable({
        columns,
        data,
        enableColumnFilterModes: false, // Prevents the menu that causes the tooltip
  enableFilterMatchHighlighting: false, // Prevents highlighting which can trigger object-to-string errors
  // Localization override to ensure the internal label doesn't generate text
  localization: {
    filterByColumn: '',
    clearFilter: '',
  },
  
    initialState: {
      pagination: { pageSize: 5, pageIndex: 0 },
      showGlobalFilter: true,
      columnFilters: [
        { id: 'date', value: { month: '', year: '2025' } } // Default year 2025
      ],
    },
    mantineTableProps: {
        striped: 'even',
      withColumnBorders: true,
      withRowBorders: true,
      withTableBorder: true,
    },
    mantinePaginationProps: {
      rowsPerPageOptions: ['5', '10', '15'],
    },
    paginationDisplayMode: 'pages',
    mantineTableBodyRowProps: ({ row }) => ({
        onClick: (event)=>onRowClick(row.original),
        sx: { cursor: 'pointer' },
      }),
      renderEmptyRowsFallback: () => (
        <div style={{ textAlign: 'center', padding: '20px', color: '#c53030' }}>
          No transactions
        </div>
      ),
      });
    
      return <MantineReactTable table={table} />;
}
TransactionTable.propTypes = {
  data: PropTypes.array.isRequired,
  onRowClick: PropTypes.func.isRequired,
};
export default TransactionTable