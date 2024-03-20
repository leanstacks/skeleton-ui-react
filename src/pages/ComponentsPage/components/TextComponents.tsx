import { PropsWithClassName, PropsWithTestId } from '@leanstacks/react-common';
import { createColumnHelper } from '@tanstack/react-table';

import CodeSnippet from 'components/Text/CodeSnippet';
import Text from 'components/Text/Text';
import { ComponentProperty } from '../model/components';
import Table from 'components/Table/Table';

/**
 * Properties for the `TextComponents` React component.
 * @see {@link PropsWithClassName}
 * @see {@link PropsWithTestId}
 */
interface TextComponentsProps extends PropsWithClassName, PropsWithTestId {}

/**
 * The `TextComponents` React component renders a set of examples illustrating
 * the use of the `Text` component.
 * @param {TextComponentsProps} props - Component properties.
 * @returns {JSX.Element} JSX
 */
const TextComponents = ({
  className,
  testId = 'components-text',
}: TextComponentsProps): JSX.Element => {
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
    {
      name: 'variant',
      description: 'Optional. Applies default styling. Default: body copy',
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
        Text Component
      </Text>

      <div className="my-8">
        The <span className="font-mono font-bold">Text</span> component displays blocks of text
        which is styled in a standardized way.
      </div>

      <div className="my-8">
        <Text variant="heading3" className="mb-2">
          Properties
        </Text>
        <Table<ComponentProperty> data={data} columns={columns} />
      </div>

      <Text variant="heading3">Examples</Text>
      <div className="my-8">
        <div className="mb-2 flex place-content-center rounded border border-neutral-500/10 p-4 dark:bg-neutral-700/25">
          <Text variant="heading1">Heading 1</Text>
        </div>
        <CodeSnippet className="my-2" code={`<Text variant="heading1">Heading 1</Text>`} />
      </div>

      <div className="my-8">
        <div className="mb-2 flex place-content-center rounded border border-neutral-500/10 p-4 dark:bg-neutral-700/25">
          <Text variant="heading2">Heading 2</Text>
        </div>
        <CodeSnippet className="my-2" code={`<Text variant="heading2">Heading 2</Text>`} />
      </div>

      <div className="my-8">
        <div className="mb-2 flex place-content-center rounded border border-neutral-500/10 p-4 dark:bg-neutral-700/25">
          <Text variant="heading3">Heading 3</Text>
        </div>
        <CodeSnippet className="my-2" code={`<Text variant="heading3">Heading 3</Text>`} />
      </div>

      <div className="my-8">
        <div className="mb-2 flex place-content-center rounded border border-neutral-500/10 p-4 dark:bg-neutral-700/25">
          <Text>
            This is standard body copy text. It may be styled in various ways such as{' '}
            <span className="font-bold">bold</span> or <span className="italic">italic</span>, as{' '}
            <span className="underline">underlined</span> or{' '}
            <span className="line-through">strikethrough</span>.
          </Text>
        </div>
        <CodeSnippet
          className="my-2"
          code={`<Text>
  This is the standard body copy text. It may be styled in various ways such as{' '}
  <span className="font-bold">bold</span> or <span className="italic">italic</span>, as{' '}
  <span className="underline">underlined</span> or{' '}
  <span className="line-through">strikethrough</span>.
</Text>`}
        />
      </div>
    </section>
  );
};

export default TextComponents;
