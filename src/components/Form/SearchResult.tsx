import { PropsWithClassName, PropsWithTestId } from '@leanstacks/react-common';
import classNames from 'classnames';
import { PropsWithChildren } from 'react';

/**
 * Properties for the `SearchResult` React component.
 * @param {function} onClick - Function invoked when this `SearchResult` is clicked.
 * @see {@link PropsWithChildren}
 * @see {@link PropsWithClassName}
 * @see {@link PropsWithTestId}
 */
export interface SearchResultProps extends PropsWithChildren, PropsWithClassName, PropsWithTestId {
  onClick: () => void;
}

/**
 * The `SearchResult` component renders a single result item for a `SearchField`.
 *
 * This component is **always** used in conjunction with a `SearchField`,
 * specifically in the `renderSearchResults` render function.
 * @param {SearchResultProps} props - Component properties, `SearchResultProps`.
 * @returns {JSX.Element} JSX
 */
const SearchResult = ({
  children,
  className,
  onClick,
  testId = 'field-search-result',
}: SearchResultProps): JSX.Element => {
  return (
    <div
      className={classNames(
        'flex h-16 cursor-pointer items-center border-b border-neutral-500/50 px-4 last:border-none hover:bg-neutral-500/25',
        className,
      )}
      onClick={onClick}
      data-testid={testId}
    >
      {children}
    </div>
  );
};

export default SearchResult;
