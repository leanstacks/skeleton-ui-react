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
        Button Components
      </Text>

      <div className="my-8">
        <Button>Default button</Button>
        <CodeSnippet className="my-2" code={`<Button>Default button</Button>`} />
      </div>

      <div className="my-8">
        <Button variant={ButtonVariant.Outline}>Outline button</Button>
        <CodeSnippet
          className="my-2"
          code={`<Button variant={ButtonVariant.Outline}>Outline button</Button>`}
        />
      </div>

      <div className="my-8">
        <Button variant={ButtonVariant.Solid}>Solid button</Button>
        <CodeSnippet
          className="my-2"
          code={`<Button variant={ButtonVariant.Solid}>Solid button</Button>`}
        />
      </div>

      <div className="my-8">
        <Button variant={ButtonVariant.Text}>Text button</Button>
        <CodeSnippet
          className="my-2"
          code={`<Button variant={ButtonVariant.Text}>Text button</Button>`}
        />
      </div>
    </section>
  );
};

export default ButtonComponents;
