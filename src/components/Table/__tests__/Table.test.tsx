import { createColumnHelper } from '@tanstack/react-table';
import { render, screen } from 'test/test-utils';
import Table from '../Table';

describe('Table', () => {
  type Foo = {
    bar: string;
    baz: number;
    max: number;
  };
  const data: Foo[] = [
    {
      bar: 'one',
      baz: 1,
      max: 20,
    },
    {
      bar: 'two',
      baz: 2,
      max: 40,
    },
  ];
  const columnHelper = createColumnHelper<Foo>();
  const columns = [
    columnHelper.group({
      id: 'grouped',
      header: 'Grouped',
      columns: [
        columnHelper.accessor('bar', { cell: (info) => info.renderValue(), header: 'Bar' }),
        columnHelper.accessor('baz', { cell: (info) => info.renderValue(), header: 'Baz' }),
      ],
    }),
    columnHelper.accessor('max', { cell: (info) => info.renderValue(), header: 'Max' }),
  ];

  it('should render successfully', async () => {
    // ARRANGE
    render(<Table<Foo> data={data} columns={columns} />);
    await screen.findByTestId('table');

    // ASSERT
    expect(screen.getByTestId('table')).toBeDefined();
  });

  it('should use custom testId', async () => {
    // ARRANGE
    render(<Table<Foo> data={data} columns={columns} testId="custom-testId" />);
    await screen.findByTestId('custom-testId');

    // ASSERT
    expect(screen.getByTestId('custom-testId')).toBeDefined();
  });

  it('should use custom className', async () => {
    // ARRANGE
    render(<Table<Foo> data={data} columns={columns} className="custom-className" />);
    await screen.findByTestId('table');

    // ASSERT
    expect(screen.getByTestId('table').classList).toContain('custom-className');
  });
});
