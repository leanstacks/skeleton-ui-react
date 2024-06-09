import { PropsWithTestId } from '@leanstacks/react-common';
import classNames from 'classnames';

export interface TabProps extends PropsWithTestId {
  isActive?: boolean;
  label: string;
  onClick?: () => void;
}

const Tab = ({ isActive = false, label, onClick, testId = 'tab' }: TabProps): JSX.Element => {
  const handleClick = () => {
    onClick?.();
  };

  return (
    <div
      className={classNames(
        'flex w-full cursor-pointer items-center justify-center px-2 py-1 text-sm font-bold uppercase',
        {
          'border-b-2 border-b-blue-300 dark:border-b-blue-600': isActive,
        },
        {
          'border-b-2 border-transparent': !isActive,
        },
      )}
      onClick={handleClick}
      data-testid={testId}
    >
      {label}
    </div>
  );
};

export default Tab;
