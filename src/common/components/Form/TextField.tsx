import { InputHTMLAttributes, useEffect, useRef, useState } from 'react';
import { useField } from 'formik';
import { PropsWithTestId } from '@leanstacks/react-common';
import classNames from 'classnames';

/**
 * Properties for the `TextField` component.
 */
interface TextFieldProps extends InputHTMLAttributes<HTMLInputElement>, PropsWithTestId {
  label?: string;
  name: string;
  supportingText?: string;
}

/**
 * The `TextField` component renders an HTML `input` element. It is used to capture
 * input from a user.
 * @param {TextFieldProps} props - Component properties, `TextFieldProps`.
 * @returns {JSX.Element} JSX
 */
const TextField = ({
  className,
  label,
  supportingText,
  testId = 'field-text',
  ...props
}: TextFieldProps): JSX.Element => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [field, meta] = useField(props);
  const [showInput, setShowInput] = useState(!!field.value || !!props.autoFocus);
  const showError = meta.touched && meta.error;
  const isDisabled = !!props.disabled || !!props.readOnly;

  useEffect(() => {
    setShowInput(!!field.value || !!props.autoFocus);
  }, [field.value, props.autoFocus]);

  /**
   * Performed when the component is focused, e.g. clicked, tapped, or
   * otherwise focused.
   */
  const doFocus = () => {
    if (!isDisabled) {
      setShowInput(true);
      inputRef.current?.focus();
    }
  };

  return (
    <div
      className={className}
      onClick={doFocus}
      onBlur={() => setShowInput(!!field.value)}
      data-testid={testId}
    >
      <div
        className={classNames(
          'mb-1 flex h-16 flex-col border-b border-neutral-500/50 bg-neutral-500/10 px-4 py-2 has-[:focus]:border-blue-600',
          { 'justify-between': showInput },
          { 'justify-center': !showInput },
          {
            'border-red-600 has-[:focus]:border-red-600': showError,
          },
          {
            'opacity-50 hover:bg-neutral-500/10': isDisabled,
          },
          {
            'hover:bg-neutral-500/25': !isDisabled,
          },
        )}
      >
        {label && (
          <label
            htmlFor={props.id ?? props.name}
            className={classNames('opacity-75', { 'text-sm': showInput })}
            data-testid={`${testId}-label`}
          >
            {label}
          </label>
        )}
        <input
          id={props.id ?? props.name}
          className={classNames('bg-transparent focus-visible:outline-none', {
            'size-0': !showInput,
          })}
          {...field}
          {...props}
          ref={inputRef}
          data-testid={`${testId}-input`}
        />
      </div>
      {supportingText && (
        <div className="ms-4 text-sm opacity-75" data-testid={`${testId}-supporting-text`}>
          {supportingText}
        </div>
      )}
      {showError && (
        <div className="ms-4 text-sm text-red-600" data-testid={`${testId}-error`}>
          {meta.error}
        </div>
      )}
    </div>
  );
};

export default TextField;
