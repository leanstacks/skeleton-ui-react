import { BaseComponentProps } from '@leanstacks/react-common';
import classNames from 'classnames';

interface DividerProps extends BaseComponentProps {}

const Divider = ({ className, testId = 'divider' }: DividerProps): JSX.Element => {
  return (
    <div
      className={classNames('h-0 w-full border-t border-neutral-500/50', className)}
      data-testid={testId}
    ></div>
  );
};

export default Divider;
