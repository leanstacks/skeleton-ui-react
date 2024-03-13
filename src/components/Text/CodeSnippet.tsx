import { SandpackProvider, SandpackLayout, SandpackCodeEditor } from '@codesandbox/sandpack-react';
import { PropsWithClassName, PropsWithTestId } from '@leanstacks/react-common';

interface CodeSnippetProps extends PropsWithClassName, PropsWithTestId {
  code: string;
}

const CodeSnippet = ({
  className,
  code,
  testId = 'code-snippet',
}: CodeSnippetProps): JSX.Element => {
  const files = {
    '/App.js': code,
  };

  return (
    <div className={className} data-testid={testId}>
      <SandpackProvider template="react" theme="dark" files={files}>
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
