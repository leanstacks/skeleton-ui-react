import { PropsWithClassName, PropsWithTestId } from '@leanstacks/react-common';
import { createColumnHelper } from '@tanstack/react-table';

import { ComponentProperty } from '../model/components';
import Text from 'components/Text/Text';
import Table from 'components/Table/Table';
import CodeSnippet from 'components/Text/CodeSnippet';
import Badge from 'components/Badge/Badge';

/**
 * Properties for the `BadgeComponents` React component.
 * @see {@link PropsWithClassName}
 * @see {@link PropsWithTestId}
 */
interface BadgeComponentsProps extends PropsWithClassName, PropsWithTestId {}

/**
 * The `BadgeComponents` React component renders a set of examples illustrating
 * the use of the `Badge` component.
 * @param {BadgeComponentsProps} props - Component properties.
 * @returns {JSX.Element} JSX
 */
const BadgeComponents = ({
  className,
  testId = 'components-badge',
}: BadgeComponentsProps): JSX.Element => {
  const data: ComponentProperty[] = [
    {
      name: 'children',
      description: 'The content to be displayed.',
    },
    {
      name: 'className',
      description: 'Optional. Additional CSS class names.',
    },
    {
      name: 'testId',
      description: 'Optional. Identifier for testing.',
    },
  ];
  const columnHelper = createColumnHelper<ComponentProperty>();
  const columns = [
    columnHelper.accessor('name', {
      cell: (info) => <span className="font-mono text-sky-600">{info.getValue()}</span>,
      header: () => 'Name',
    }),
    columnHelper.accessor('description', {
      cell: (info) => info.renderValue(),
      header: () => 'Description',
    }),
  ];

  return (
    <section className={className} data-testid={testId}>
      <Text variant="heading2" className="mb-4">
        Badge Component
      </Text>

      <div className="my-8">
        The <span className="font-mono font-bold">Badge</span> component displays a stylized
        counter. Useful for displaying the number of items of a specific type, for example, the
        number of notifications.
      </div>

      <div className="my-8">
        <Text variant="heading3" className="mb-2">
          Properties
        </Text>
        <Table<ComponentProperty, string> data={data} columns={columns} />
      </div>

      <Text variant="heading3">Examples</Text>
      <div className="my-8">
        <div className="mb-2 flex place-content-center rounded border border-neutral-500/10 p-4 dark:bg-neutral-700/25">
          <Badge>3</Badge>
        </div>
        <CodeSnippet className="my-2" code={`<Badge>3</Badge>`} />
      </div>

      <div className="my-8">
        <div className="mb-2 flex place-content-center rounded border border-neutral-500/10 p-4 dark:bg-neutral-700/25">
          <Badge>999+</Badge>
        </div>
        <CodeSnippet className="my-2" code={`<Badge>999+</Badge>`} />
      </div>

      <div className="my-8">
        <div className="mb-2 flex place-content-center rounded border border-neutral-500/10 p-4 dark:bg-neutral-700/25">
          <Badge className="!bg-blue-500" testId="my-badge">
            19
          </Badge>
        </div>
        <CodeSnippet
          className="my-2"
          code={`<Badge className='!bg-blue-500' testId='my-badge'>19</Badge>`}
        />
      </div>

      <div className="my-8">
        <div className="mb-2 flex place-content-center rounded border border-neutral-500/10 p-4 dark:bg-neutral-700/25">
          <Badge className="!bg-neutral-500 uppercase" testId="badge-status-closed">
            Closed
          </Badge>
        </div>
        <CodeSnippet
          className="my-2"
          code={`<Badge className="!bg-neutral-500 uppercase" testId="badge-status-closed">
  Closed
</Badge>`}
        />
      </div>
    </section>
  );
};

export default BadgeComponents;
