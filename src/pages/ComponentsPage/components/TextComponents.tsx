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

      <div className='my-8'>
        The <span className='font-mono font-bold'>Text</span> component displays blocks of text which is 
        styled in a standardized way.  
      </div>

      <div className='my-8'>
        <Text variant='heading3' className='mb-2'>Properties</Text>
        <table className='w-full text-sm border-collapse text-left'>
          <thead>
            <tr>
              <th className='border-b border-neutral-400/25 py-2 pr-2 font-semibold'>Name</th>
              <th className='border-b border-neutral-400/25 py-2 pr-2 font-semibold'>Description</th>
            </tr>
          </thead>
          <tbody className='align-baseline'>
            <tr>
              <td className='py-2 pr-2 font-mono border-t border-neutral-400/10 text-sky-600'>children</td>
              <td className='py-2 pr-2 border-t border-neutral-400/10'>The content to be displayed.</td>
            </tr>
            <tr>
              <td className='py-2 pr-2 font-mono border-t border-neutral-400/10 text-sky-600'>className</td>
              <td className='py-2 pr-2 border-t border-neutral-400/10'>Optional class names to apply.</td>
            </tr>
            <tr>
              <td className='py-2 pr-2 font-mono border-t border-neutral-400/10 text-sky-600'>testId</td>
              <td className='py-2 pr-2 border-t border-neutral-400/10'>Optional identifier for testing purposes.</td>
            </tr>
            <tr>
              <td className='py-2 pr-2 font-mono border-t border-neutral-400/10 text-sky-600'>variant</td>
              <td className='py-2 pr-2 border-t border-neutral-400/10'>Optional. Applies default styling. Default: body copy</td>
            </tr>
          </tbody>
        </table>
      </div>

      <Text variant='heading3'>Examples</Text>
      <div className="my-8">
        <div className='mb-2 border border-neutral-500/10 p-4 flex place-content-center dark:bg-neutral-700/25 rounded'>
          <Text variant="heading1">Heading 1</Text>
        </div>
        <CodeSnippet className="my-2" code={`<Text variant="heading1">Heading 1</Text>`} />
      </div>

      <div className="my-8">
        <div className='mb-2 border border-neutral-500/10 p-4 flex place-content-center dark:bg-neutral-700/25 rounded'>
          <Text variant="heading2">Heading 2</Text>
        </div>
        <CodeSnippet className="my-2" code={`<Text variant="heading2">Heading 2</Text>`} />
      </div>

      <div className="my-8">
        <div className='mb-2 border border-neutral-500/10 p-4 flex place-content-center dark:bg-neutral-700/25 rounded'>
          <Text variant="heading3">Heading 3</Text>
        </div>
        <CodeSnippet className="my-2" code={`<Text variant="heading3">Heading 3</Text>`} />
      </div>

      <div className="my-8">
        <div className='mb-2 border border-neutral-500/10 p-4 flex place-content-center dark:bg-neutral-700/25 rounded'>
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
