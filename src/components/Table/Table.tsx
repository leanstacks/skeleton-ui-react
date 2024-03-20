import { PropsWithClassName, PropsWithTestId } from '@leanstacks/react-common';
import { ColumnDef, flexRender, getCoreRowModel, useReactTable } from '@tanstack/react-table';
import classNames from 'classnames';

/**
 * Properties for the `Table` React component.
 * @template TData - The type of the table data object.
 * @param {ColumnDef<TData>[]} columns - An array of `ColumnDef`, column definition, objects.
 * @param {TData[]} data - An array of data objects, of type `TData`,
 * which are used to populate the rows of the table.
 */
interface TableProps<TData = unknown> extends PropsWithClassName, PropsWithTestId {
  columns: ColumnDef<TData, any>[];
  data: TData[];
}

/**
 * The `Table` component renders a `table` element using the column definitions
 * and data supplied in the properties.
 *
 * Uses TanStack Table.
 * @template TData - The type of the table data object.
 * @param {TableProps} props - Component properteis.
 * @returns {JSX.Element} JSX
 * @see {@link https://tanstack.com/table/latest TanStack Table}
 */
const Table = <TData,>({
  className,
  columns,
  data,
  testId = 'table',
}: TableProps<TData>): JSX.Element => {
  const table = useReactTable({ data, columns, getCoreRowModel: getCoreRowModel() });

  return (
    <table
      className={classNames('w-full border-collapse text-left text-sm', className)}
      data-testid={testId}
    >
      <thead>
        {table.getHeaderGroups().map((headerGroup) => (
          <tr key={headerGroup.id}>
            {headerGroup.headers.map((header) => (
              <th
                key={header.id}
                className="border-b border-neutral-400/25 py-2 pr-2 font-semibold"
              >
                {header.isPlaceholder
                  ? null
                  : flexRender(header.column.columnDef.header, header.getContext())}
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody className="align-baseline">
        {table.getRowModel().rows.map((row) => (
          <tr key={row.id}>
            {row.getVisibleCells().map((cell) => (
              <td key={cell.id} className="border-t border-neutral-400/10 py-2 pr-2">
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;
