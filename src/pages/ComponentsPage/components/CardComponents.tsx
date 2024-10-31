import { PropsWithClassName, PropsWithTestId } from '@leanstacks/react-common';
import { createColumnHelper } from '@tanstack/react-table';

import { ComponentProperty } from '../model/components';
import Text from 'components/Text/Text';
import Table from 'components/Table/Table';
import CodeSnippet from 'components/Text/CodeSnippet';
import Card from 'components/Card/Card';
import MessageCard from 'components/Card/MessageCard';

/**
 * Properties for the `CardComponents` React component.
 * @see {@link PropsWithClassName}
 * @see {@link PropsWithTestId}
 */
interface CardComponentsProps extends PropsWithClassName, PropsWithTestId {}

/**
 * The `CardComponents` React component renders a set of examples illustrating
 * the use of the `Card` family of components.
 * @param {CardComponentsProps} props - Component properties.
 * @returns {JSX.Element} JSX
 */
const CardComponents = ({
  className,
  testId = 'components-card',
}: CardComponentsProps): JSX.Element => {
  const columnHelper = createColumnHelper<ComponentProperty>();
  const cardData: ComponentProperty[] = [
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
  const messageCardData: ComponentProperty[] = [
    {
      name: 'className',
      description: 'Optional. Additional CSS class names.',
    },
    {
      name: 'iconProps',
      description: 'Optional. Icon properties object.',
    },
    {
      name: 'message',
      description: 'Messasge text.',
    },
    {
      name: 'testId',
      description: 'Optional. Identifier for testing.',
    },
    {
      name: 'title',
      description: 'Optional. Title text.',
    },
  ];
  const columns = [
    columnHelper.accessor('name', {
      cell: (info) => (
        <span className="font-mono text-sky-700 dark:text-sky-500">{info.getValue()}</span>
      ),
      header: () => 'Name',
    }),
    columnHelper.accessor('description', {
      cell: (info) => info.renderValue(),
      header: () => 'Description',
    }),
  ];

  return (
    <section className={className} data-testid={testId}>
      <div className="mb-16">
        <Text variant="heading2" className="mb-4">
          Card Component
        </Text>

        <div className="my-8">
          The <span className="font-mono font-bold">Card</span> component displays block container
          for a group of related content.
        </div>

        <div className="my-8">
          <Text variant="heading3" className="mb-2">
            Properties
          </Text>
          <Table<ComponentProperty, string> data={cardData} columns={columns} />
        </div>

        <Text variant="heading3">Examples</Text>
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
      </div>

      <div className="mb-16">
        <Text variant="heading2" className="mb-4">
          MessageCard Component
        </Text>

        <div className="my-8">
          The <span className="font-mono font-bold">MessageCard</span> component displays block
          container for displaying messages. The card consists of a message with optional title and
          icon.
        </div>

        <div className="my-8">
          <Text variant="heading3" className="mb-2">
            Properties
          </Text>
          <Table<ComponentProperty, string> data={messageCardData} columns={columns} />
        </div>

        <Text variant="heading3">Examples</Text>
        <div className="my-8">
          <div className="mb-2 flex place-content-center rounded border border-neutral-500/10 p-4 dark:bg-neutral-700/25">
            <MessageCard message="Hello World!" />
          </div>
          <CodeSnippet className="my-2" code={`<MessageCard message="Hello World!" />`} />
        </div>

        <div className="my-8">
          <div className="mb-2 flex place-content-center rounded border border-neutral-500/10 p-4 dark:bg-neutral-700/25">
            <MessageCard
              iconProps={{ icon: 'circleInfo', size: '2x' }}
              message="Select an item from the list to view details."
              testId="my-empty-state"
            />
          </div>
          <CodeSnippet
            className="my-2"
            code={`<MessageCard
  iconProps={{ icon: 'circleInfo', size: '2x' }}
  message="Select an item from the list to view details."
  testId='my-empty-state'
/>`}
          />
        </div>

        <div className="my-8">
          <div className="mb-2 flex place-content-center rounded border border-neutral-500/10 p-4 dark:bg-neutral-700/25">
            <MessageCard
              className="text-red-800"
              iconProps={{ icon: 'circleExclamation', size: '2x', className: 'text-red-600' }}
              message="Are you sure you wish to proceed?"
              title="Stop!"
            />
          </div>
          <CodeSnippet
            className="my-2"
            code={`<MessageCard
  className="text-red-800"
  iconProps={{ icon: 'circleExclamation', size: '2x', className: 'text-red-600' }}
  message="Are you sure you wish to proceed?"
  title="Stop!"
/>`}
          />
        </div>
      </div>
    </section>
  );
};

export default CardComponents;
