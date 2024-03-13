import { SandpackProvider, SandpackLayout, SandpackCodeEditor } from '@codesandbox/sandpack-react';
import { PropsWithClassName, PropsWithTestId } from '@leanstacks/react-common';
import { useSettings } from 'providers/SettingsProvider';

interface CodeSnippetProps extends PropsWithClassName, PropsWithTestId {
  code: string;
}

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
