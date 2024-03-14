import { ChangeEvent, ReactElement, useEffect, useRef } from 'react';
import { PropsWithClassName, PropsWithTestId } from '@leanstacks/react-common';
import classNames from 'classnames';

import Icon from 'components/Icon/Icon';
import { SearchResultProps } from './SearchResult';

/**
 * Properties for the `SearchField` React component.
 * @param {string} [errorText] - Optional. Field error message.
 * @param {boolean} [isLoading] - Optional. Indicates if the results are loading.
 * Default: `false`
 * @param {function} onChange - Function invoked when the input value changes.
 * @param {function} renderSearchResults - A function which returns one or
 * more `SearchResult` components.
 * @param {string} [supportingText] - Optional. Field help text.
 * @see {@link PropsWithClassName}
 * @see {@link PropsWithTestId}
 */
interface SearchFieldProps extends PropsWithClassName, PropsWithTestId {
  errorText?: string;
  isLoading?: boolean;
  onChange: (value: string) => void;
  renderSearchResults: () => ReactElement<SearchResultProps>[] | undefined;
  supportingText?: string;
}

/**
 * The `SearchField` component renders a search input field. The
 * component consists of a leading icon, a trailing icon, and an input field.
 *
 * The component invokes the supplied `onChange` function as the value of
 * the input field changes. This allows the parent component to load data
 * using the input field value.
 *
 * The parent component implements the `renderSearchResults` render prop
 * function. This function returns one to many `SearchResult` components,
 * one for each search result value returned by the data lookup.
 * @param {SearchFieldProps} props - Component properties, `SearchFieldProps`.
 * @returns {JSX.Element} JSX
 */
const SearchField = ({
  className,
  errorText,
  isLoading = false,
  onChange,
  renderSearchResults,
  supportingText,
  testId = 'field-search',
}: SearchFieldProps): JSX.Element => {
  const inputRef = useRef<HTMLInputElement>(null);
  const searchResults = renderSearchResults();

  /**
   * Handle input field value changes.
   * @param e - The change event for the input field.
   */
  const doOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };

  /**
   * Focus the cursor within the input field.
   */
  const doFocus = () => {
    inputRef.current?.focus();
  };

  /**
   * Focus on initial render.
   */
  useEffect(() => {
    doFocus();
  }, []);

  return (
    <div className={className} onClick={doFocus} data-testid={testId}>
      <div
        className={classNames(
          'flex h-16 items-center border-b border-neutral-500/50 bg-neutral-500/10 px-4 py-2 has-[:focus]:border-blue-600',
        )}
      >
        <Icon name="search" className="me-2" data-testid={`${testId}-icon-leading`} />
        <input
          name={`${testId}-input`}
          onChange={doOnChange}
          className={classNames(
            'flex-grow appearance-none bg-transparent focus-visible:outline-none',
          )}
          autoComplete="off"
          ref={inputRef}
          data-testid={`${testId}-input`}
        />
        <Icon
          name="progress_activity"
          className={classNames('ms-2 animate-spin', {
            invisible: !isLoading,
          })}
          data-testid={`${testId}-icon-trailing`}
        />
      </div>
      {!!supportingText && (
        <div className="my-1 ms-4 text-sm opacity-75" data-testid={`${testId}-supporting-text`}>
          {supportingText}
        </div>
      )}
      {!!errorText && (
        <div className="my-1 ms-4 text-sm text-red-600" data-testid={`${testId}-error`}>
          {errorText}
        </div>
      )}

      <div className={classNames('max-h-64 overflow-y-auto bg-neutral-500/10')}>
        {searchResults}
      </div>
    </div>
  );
};

export default SearchField;
