import { PropsWithClassName, PropsWithTestId } from '@leanstacks/react-common';
import { createColumnHelper } from '@tanstack/react-table';

import { ComponentProperty } from '../model/components';
import Text from 'components/Text/Text';
import Table from 'components/Table/Table';
import CodeSnippet from 'components/Text/CodeSnippet';
import Card from 'components/Card/Card';
import MessageCard from 'components/Card/MessageCard';

interface CardComponentsProps extends PropsWithClassName, PropsWithTestId {}

const CardComponents = ({
  className,
  testId = 'components-badge',
}: CardComponentsProps): JSX.Element => {
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
        Card Component
      </Text>

      <div className="my-8">
        The <span className="font-mono font-bold">Card</span> component displays block container for
        a group of related content.
      </div>

      <div className="my-8">
        <Text variant="heading3" className="mb-2">
          Properties
        </Text>
        <Table<ComponentProperty> data={data} columns={columns} />
      </div>

      <Text variant="heading3">Examples</Text>
      <Text className="my-4 font-bold">Card</Text>
      <div className="my-8">
        <div className="mb-2 flex place-content-center rounded border border-neutral-500/10 p-4 dark:bg-neutral-700/25">
          <Card>I am the card content.</Card>
        </div>
        <CodeSnippet className="my-2" code={`<Card>I am the card content.</Card>`} />
      </div>

      <div className="my-8">
        <div className="mb-2 flex place-content-center rounded border border-neutral-500/10 p-4 dark:bg-neutral-700/25">
          <Card className="bg-slate-800 text-white" testId="my-card">
            I am the card content.
          </Card>
        </div>
        <CodeSnippet
          className="my-2"
          code={`<Card className="bg-slate-800 text-white" testId="my-card">
  I am the card content.
</Card>`}
        />
      </div>

      <Text className="my-4 font-bold">Message Card</Text>

      <div className="my-8">
        <div className="mb-2 flex place-content-center rounded border border-neutral-500/10 p-4 dark:bg-neutral-700/25">
          <MessageCard message="Hello World!" />
        </div>
        <CodeSnippet className="my-2" code={`<MessageCard message="Hello World!" />`} />
      </div>

      <div className="my-8">
        <div className="mb-2 flex place-content-center rounded border border-neutral-500/10 p-4 dark:bg-neutral-700/25">
          <MessageCard
            className="text-red-600"
            iconProps={{ name: 'report', className: 'text-5xl' }}
            message="Are you sure you wish to proceed?"
            title="Stop!"
          />
        </div>
        <CodeSnippet
          className="my-2"
          code={`<MessageCard
  className="text-red-600"
  iconProps={{ name: 'report', className: 'text-5xl' }}
  message="Are you sure you wish to proceed?"
  title="Stop!"
/>`}
        />
      </div>
    </section>
  );
};

export default CardComponents;
