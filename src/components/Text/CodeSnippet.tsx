import { SandpackProvider, SandpackLayout, SandpackCodeEditor } from '@codesandbox/sandpack-react';
import { PropsWithClassName, PropsWithTestId } from '@leanstacks/react-common';
import { useSettings } from 'hooks/useSettings';

/**
 * The GitHub light Sandpack theme.
 * @see {@link https://sandpack.codesandbox.io/theme}
 */
const themeLight = {
  colors: {
    surface1: '#ffffff',
    surface2: '#F3F3F3',
    surface3: '#f5f5f5',
    clickable: '#959da5',
    base: '#24292e',
    disabled: '#d1d4d8',
    hover: '#24292e',
    accent: '#24292e',
  },
  syntax: {
    keyword: '#d73a49',
    property: '#005cc5',
    plain: '#24292e',
    static: '#032f62',
    string: '#032f62',
    definition: '#6f42c1',
    punctuation: '#24292e',
    tag: '#22863a',
    comment: {
      color: '#6a737d',
    },
  },
};

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
      <SandpackProvider
        template="react"
        theme={theme === 'light' ? themeLight : 'dark'}
        files={files}
      >
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
