import { ButtonVariant, PropsWithClassName, PropsWithTestId } from '@leanstacks/react-common';

import Button from 'components/Button/Button';
import CodeSnippet from 'components/Text/CodeSnippet';
import Text from 'components/Text/Text';

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
        <table className="w-full border-collapse text-left text-sm">
          <thead>
            <tr>
              <th className="border-b border-neutral-400/25 py-2 pr-2 font-semibold">Name</th>
              <th className="border-b border-neutral-400/25 py-2 pr-2 font-semibold">
                Description
              </th>
            </tr>
          </thead>
          <tbody className="align-baseline">
            <tr>
              <td className="border-t border-neutral-400/10 py-2 pr-2 font-mono text-sky-600">
                children
              </td>
              <td className="border-t border-neutral-400/10 py-2 pr-2">
                The button content or label.
              </td>
            </tr>
            <tr>
              <td className="border-t border-neutral-400/10 py-2 pr-2 font-mono text-sky-600">
                className
              </td>
              <td className="border-t border-neutral-400/10 py-2 pr-2">
                Optional class names to apply.
              </td>
            </tr>
            <tr>
              <td className="border-t border-neutral-400/10 py-2 pr-2 font-mono text-sky-600">
                onClick
              </td>
              <td className="border-t border-neutral-400/10 py-2 pr-2">
                Optional. Click event handler function.
              </td>
            </tr>
            <tr>
              <td className="border-t border-neutral-400/10 py-2 pr-2 font-mono text-sky-600">
                testId
              </td>
              <td className="border-t border-neutral-400/10 py-2 pr-2">
                Optional identifier for testing purposes.
              </td>
            </tr>
            <tr>
              <td className="border-t border-neutral-400/10 py-2 pr-2 font-mono text-sky-600">
                variant
              </td>
              <td className="border-t border-neutral-400/10 py-2 pr-2">
                Optional. Applies default styling. Default: solid
              </td>
            </tr>
          </tbody>
        </table>
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
