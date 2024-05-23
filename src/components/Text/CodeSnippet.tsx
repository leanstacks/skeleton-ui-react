import { SandpackProvider, SandpackLayout, SandpackCodeEditor } from '@codesandbox/sandpack-react';
import { PropsWithClassName, PropsWithTestId } from '@leanstacks/react-common';
import { useSettings } from 'hooks/useSettings';
/**
 * Properties for the `CodeSnippet` React component.
 * @param {string} code - The code snippet.
 * @see {@link PropsWithClassName}
 * @see {@link PropsWithTestId}
 */
interface CodeSnippetProps extends PropsWithClassName, PropsWithTestId {
  code: string;
}

/**
 * The `CodeSnippet` component renders a read only block which highlights
 * a small amount of application code such as JavaScript, JSX, or CSS.
 * @param {CodeSnippetProps} props - Component properties.
 * @returns {JSX.Element} JSX
 */
const CodeSnippet = ({
  className,
  code,
  testId = 'code-snippet',
}: CodeSnippetProps): JSX.Element => {
  const { theme } = useSettings();
  const files = {
    '/App.js': code,
  };

  return (
    <div className={className} data-testid={testId}>
      <SandpackProvider template="react" theme={theme} files={files}>
        <SandpackLayout>
          <SandpackCodeEditor
            className="!h-fit rounded-lg"
            readOnly={true}
            showLineNumbers={true}
            showReadOnly={false}
          />
        </SandpackLayout>
      </SandpackProvider>
    </div>
  );
};

export default CodeSnippet;
