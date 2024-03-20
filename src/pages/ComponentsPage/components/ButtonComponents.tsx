import { ButtonVariant, PropsWithClassName, PropsWithTestId } from '@leanstacks/react-common';

import Button from 'components/Button/Button';
import CodeSnippet from 'components/Text/CodeSnippet';
import Text from 'components/Text/Text';
import { ComponentProperty } from '../model/components';
import { createColumnHelper } from '@tanstack/react-table';
import Table from 'components/Table/Table';

/**
 * Properties for the `ButtonComponents` React component.
 * @see {@link PropsWithClassName}
 * @see {@link PropsWithTestId}
 */
interface ButtonComponentsProps extends PropsWithClassName, PropsWithTestId {}

/**
 * The `ButtonComponents` React component renders a set of examples illustrating
 * the use of the `Button` component.
 * @param {ButtonComponentsProps} props - Component properties.
 * @returns {JSX.Element} JSX
 */
const ButtonComponents = ({
  className,
  testId = 'components-button',
}: ButtonComponentsProps): JSX.Element => {
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
      name: 'onClick',
      description: 'Optional. Click event handler function.',
    },
    {
      name: 'testId',
      description: 'Optional. Identifier for testing.',
    },
    {
      name: 'variant',
      description: 'Optional. Applies default styling. Default: solid',
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
        Button Component
      </Text>

      <div className="my-8">
        The <span className="font-mono font-bold">Button</span> component displays a clickable
        button which is styled in a standardized way.
      </div>

      <div className="my-8">
        <Text variant="heading3" className="mb-2">
          Properties
        </Text>
        <Table<ComponentProperty> data={data} columns={columns} />
      </div>

      <div className="my-8">
        <div className="mb-2 flex place-content-center rounded border border-neutral-500/10 p-4 dark:bg-neutral-700/25">
          <Button>Default button</Button>
        </div>
        <CodeSnippet className="my-2" code={`<Button>Default button</Button>`} />
      </div>

      <div className="my-8">
        <div className="mb-2 flex place-content-center rounded border border-neutral-500/10 p-4 dark:bg-neutral-700/25">
          <Button variant={ButtonVariant.Outline}>Outline button</Button>
        </div>
        <CodeSnippet
          className="my-2"
          code={`<Button variant={ButtonVariant.Outline}>Outline button</Button>`}
        />
      </div>

      <div className="my-8">
        <div className="mb-2 flex place-content-center rounded border border-neutral-500/10 p-4 dark:bg-neutral-700/25">
          <Button variant={ButtonVariant.Solid}>Solid button</Button>
        </div>
        <CodeSnippet
          className="my-2"
          code={`<Button variant={ButtonVariant.Solid}>Solid button</Button>`}
        />
      </div>

      <div className="my-8">
        <div className="mb-2 flex place-content-center rounded border border-neutral-500/10 p-4 dark:bg-neutral-700/25">
          <Button variant={ButtonVariant.Text}>Text button</Button>
        </div>
        <CodeSnippet
          className="my-2"
          code={`<Button variant={ButtonVariant.Text}>Text button</Button>`}
        />
      </div>

      <div className="my-8">
        <div className="mb-2 flex place-content-center rounded border border-neutral-500/10 p-4 dark:bg-neutral-700/25">
          <Button
            variant={ButtonVariant.Solid}
            className="bg-blue-600"
            onClick={() => alert('Hey! You clicked me!')}
            testId="click-me-button"
          >
            Click me
          </Button>
        </div>
        <CodeSnippet
          className="my-2"
          code={`<Button
  variant={ButtonVariant.Solid}
  className="bg-blue-600"
  onClick={() => alert('Hey! You clicked me!')}
  testId="click-me-button"
>
  Click me
</Button>`}
        />
      </div>
    </section>
  );
};

export default ButtonComponents;
