import { PropsWithClassName, PropsWithTestId } from '@leanstacks/react-common';

import CodeSnippet from 'components/Text/CodeSnippet';
import Text from 'components/Text/Text';

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
  return (
    <section className={className} data-testid={testId}>
      <Text variant="heading2" className="mb-4">
        Text Components
      </Text>

      <div className="my-8">
        <Text variant="heading1">Heading 1</Text>
        <CodeSnippet className="my-2" code={`<Text variant="heading1">Heading 1</Text>`} />
      </div>

      <div className="my-8">
        <Text variant="heading2">Heading 2</Text>
        <CodeSnippet className="my-2" code={`<Text variant="heading2">Heading 2</Text>`} />
      </div>

      <div className="my-8">
        <Text variant="heading3">Heading 3</Text>
        <CodeSnippet className="my-2" code={`<Text variant="heading3">Heading 3</Text>`} />
      </div>

      <div className="my-8">
        <div className="mb-4">Body Copy</div>
        <div>
          This is the standard body copy text. It may be styled in various ways such as{' '}
          <span className="font-bold">bold</span> or <span className="italic">italic</span>, as{' '}
          <span className="underline">underlined</span> or{' '}
          <span className="line-through">strikethrough</span>.
        </div>
        <CodeSnippet
          className="my-2"
          code={`<div>
  This is the standard body copy text. It may be styled in various ways such as{' '}
  <span className="font-bold">bold</span> or <span className="italic">italic</span>, as{' '}
  <span className="underline">underlined</span> or{' '}
  <span className="line-through">strikethrough</span>.
</div>`}
        />
      </div>
    </section>
  );
};

export default TextComponents;
