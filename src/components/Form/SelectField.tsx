import { InputHTMLAttributes, useEffect, useMemo, useState } from 'react';
import { PropsWithTestId } from '@leanstacks/react-common';
import { useField } from 'formik';
import classNames from 'classnames';

import Icon from 'components/Icon/Icon';

/**
 * Describes a single option for a `SelectField`. If `label` is omitted,
 * the `value` is displayed.
 * @param {string} [label] - Optional. The text to display. If omitted, the
 * `value` is displayed.
 * @param {string} value - The value of the option.
 */
export interface SelectFieldOption {
  label?: string;
  value: string;
}

/**
 * Properties for the `SelectField` component.
 * @param {string} [label] - Optional. A field label.
 * @param {function} [onChange] - Optional. Change event handler function.
 * @param {SelectFieldOption[]} options - The array of `SelectFieldOption` values.
 * @param {string} [supportingText] - Optional. Help text associated with the field.
 * @see {@link InputHTMLAttributes}
 * @see {@link PropsWithTestId}
 */
interface SelectFieldProps extends InputHTMLAttributes<HTMLSelectElement>, PropsWithTestId {
  label?: string;
  name: string;
  onChange?: () => void;
  options: SelectFieldOption[];
  supportingText?: string;
}

/**
 * The `SelectField` component renders a HTML `select` element. Displays a
 * fixed set of options from which the user may select.
 * @param {SelectFieldProps} props - Component properties, `SelectFieldProps`.
 * @returns {JSX.Element} JSX
 */
const SelectField = ({
  className,
  label,
  onChange,
  options,
  supportingText,
  testId = 'field-select',
  ...props
}: SelectFieldProps): JSX.Element => {
  const [field, meta, helper] = useField(props);
  const [showInput, setShowInput] = useState(!!field.value || !!props.autoFocus);
  const [isExpanded, setIsExpanded] = useState(!!props.autoFocus);
  const showError = meta.touched && meta.error;
  const isDisabled = !!props.disabled || !!props.readOnly;

  /**
   * Update `showInput` when field is modified.
   */
  useEffect(() => {
    setShowInput(!!field.value || !!props.autoFocus);
  }, [field.value, props.autoFocus]);

  /**
   * Toggle the open/close state of the select field.
   */
  const toggleExpanded = () => {
    if (!isDisabled) {
      setIsExpanded(!isExpanded);
    }
  };

  /**
   * Perform actions when a specific `SelectFieldOption` is selected.
   * @param value - The value of the selected `SelectFieldOption`.
   * @returns {Promise<void>} Returns an empty Promise.
   */
  const doSelectOption = async (value: string): Promise<void> => {
    await helper.setTouched(true);
    await helper.setValue(value);
    onChange?.();
  };

  /**
   * Calculate the value of the the currently selected item to be displayed
   * in the `SelectField`. If there is a value, returns the `label` if present,
   * otherwise returns the `value`. If the `SelectField` does not have a
   * value, returns `undefined`.
   */
  const selectedValue = useMemo(() => {
    if (field.value) {
      const selectedOption = options.find((option) => option.value === field.value);
      return selectedOption?.label ?? selectedOption?.value;
    }
    return undefined;
  }, [field.value, options]);

  return (
    <div className={className} onClick={toggleExpanded} role="listbox" data-testid={testId}>
      <div
        className={classNames(
          'flex h-16 items-center border-b border-neutral-500/50 bg-neutral-500/10 px-4 py-2',
          { '!border-blue-600': isExpanded },
          { 'cursor-default opacity-50 hover:bg-neutral-500/10': isDisabled },
          {
            'cursor-pointer hover:bg-neutral-500/25': !isDisabled,
          },
        )}
      >
        <div
          className={classNames(
            'flex flex-grow flex-col',
            {
              'justify-between': showInput,
            },
            {
              'justify-center': !showInput,
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
          <div
            id={props.id ?? props.name}
            className={classNames('', { 'size-0': !showInput })}
            data-testid={`${testId}-select`}
          >
            {selectedValue}
          </div>
        </div>
        <Icon
          name={isExpanded ? 'expand_less' : 'expand_more'}
          className="ms-2"
          testId={`${testId}-icon-expand`}
        />
      </div>
      {supportingText && (
        <div className="my-1 ms-4 text-sm opacity-75" data-testid={`${testId}-supporting-text`}>
          {supportingText}
        </div>
      )}
      {showError && (
        <div className="my-1 ms-4 text-sm text-red-600" data-testid={`${testId}-error`}>
          {meta.error}
        </div>
      )}

      <div
        className={classNames('max-h-64 overflow-y-auto bg-neutral-500/10', {
          hidden: !isExpanded,
        })}
        data-testid={`${testId}-options`}
      >
        {options.map(({ label, value }) => (
          <div
            className={classNames(
              'flex h-16 cursor-pointer items-center border-b border-neutral-500/50 px-4 last:border-none hover:bg-neutral-500/25',
              {
                'cursor-auto bg-neutral-500/25': field.value === value,
              },
            )}
            onClick={() => doSelectOption(value)}
            role="option"
            aria-selected={field.value === value}
            data-testid={`${testId}-option-${value}`}
            key={value}
          >
            <div className="flex-grow">{label ?? value}</div>
            {field.value === value && <Icon name="check" className="ms-2 text-green-600" />}
          </div>
        ))}
      </div>
    </div>
  );
};

export default SelectField;
