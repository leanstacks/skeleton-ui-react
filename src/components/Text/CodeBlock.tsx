import { PropsWithClassName, PropsWithTestId } from '@leanstacks/react-common';
import classNames from 'classnames';
import hljs from 'highlight.js';
import 'highlight.js/styles/a11y-dark.css';
import { PropsWithChildren, useEffect, useRef, useState } from 'react';

interface CodeBlockProps extends PropsWithChildren, PropsWithClassName, PropsWithTestId {
  language?: string;
}

const CodeBlock = ({
  children,
  className,
  language,
  testId = 'code-block',
}: CodeBlockProps): JSX.Element => {
  const codeRef = useRef(null);

  useEffect(() => {
    if (!!codeRef.current) {
      hljs.highlightElement(codeRef.current);
    }
  }, []);

  return (
    <div className={classNames('rounded-lg bg-neutral-500/10', className)} data-testid={testId}>
      <pre>
        <code style={{ background: 'transparent' }} className={language} ref={codeRef}>
          {children}
        </code>
      </pre>
    </div>
  );
};

export default CodeBlock;
