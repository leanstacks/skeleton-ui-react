import { PropsWithClassName, PropsWithTestId } from '@leanstacks/react-common';
import classNames from 'classnames';
import hljs from 'highlight.js';
import 'highlight.js/styles/a11y-light.css';

interface CodeBlockProps extends PropsWithClassName, PropsWithTestId {
  code: string;
  language?: string;
}

const CodeBlock = ({
  className,
  code = '',
  language,
  testId = 'code-block',
}: CodeBlockProps): JSX.Element => {
  const highlight = (code: string, language?: string): string => {
    if (language) {
      return hljs.highlight(code, { language }).value;
    } else {
      return hljs.highlightAuto(code).value;
    }
  };

  return (
    <div className={classNames('rounded-lg bg-neutral-500/10 p-4', className)} data-testid={testId}>
      <pre>
        <code dangerouslySetInnerHTML={{ __html: highlight(code, language) }} />
      </pre>
    </div>
  );
};

export default CodeBlock;
