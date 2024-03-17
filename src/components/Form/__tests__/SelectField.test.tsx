import userEvent from '@testing-library/user-event';
import { render, screen } from '@testing-library/react';
import * as FormikLibrary from 'formik';

import SelectField, { SelectFieldOption } from '../SelectField';

describe('SelectField', () => {
  const useFieldSpy = jest.spyOn(FormikLibrary, 'useField');
  const mockSetValue = jest.fn();
  const mockSetTouched = jest.fn();

  const options: SelectFieldOption[] = [
    {
      label: 'One',
      value: '1',
    },
    { label: 'Two', value: '2' },
    { value: '3' },
  ];

  beforeEach(() => {
    useFieldSpy.mockReturnValue([
      { value: '', name: 'testField', onChange: jest.fn(), onBlur: jest.fn() },
      {
        touched: false,
        initialTouched: false,
        value: '',
        initialValue: '',
        error: '',
        initialError: '',
      },
      { setValue: mockSetValue, setTouched: mockSetTouched, setError: jest.fn() },
    ]);
  });

  it('should render successfully', async () => {
    // ARRANGE
    render(<SelectField name="testField" options={options} />);
    await screen.findByTestId('field-select');

    // ASSERT
    expect(screen.getByTestId('field-select')).toBeDefined();
  });

  it('should use custom testId', async () => {
    // ARRANGE
    render(<SelectField name="testField" options={options} testId="custom-testId" />);
    await screen.findByTestId('custom-testId');

    // ASSERT
    expect(screen.getByTestId('custom-testId')).toBeDefined();
  });

  it('should use custom className', async () => {
    // ARRANGE
    render(<SelectField name="testField" options={options} className="custom-className" />);
    await screen.findByTestId('field-select');

    // ASSERT
    expect(screen.getByTestId('field-select').classList).toContain('custom-className');
  });

  it('should show label', async () => {
    // ARRANGE
    render(<SelectField name="testField" label="testLabel" options={options} />);
    await screen.findByTestId('field-select-label');

    // ASSERT
    expect(screen.getByTestId('field-select-label').textContent).toBe('testLabel');
  });

  it('should show supporting text', async () => {
    // ARRANGE
    render(<SelectField name="testField" supportingText="supporting" options={options} />);
    await screen.findByTestId('field-select-supporting-text');

    // ASSERT
    expect(screen.getByTestId('field-select-supporting-text').textContent).toBe('supporting');
  });

  it('should display selected option label', async () => {
    // ARRANGE
    useFieldSpy.mockReturnValue([
      { value: '1', name: 'testValue', onChange: jest.fn(), onBlur: jest.fn() },
      {
        touched: false,
        initialTouched: false,
        value: '1',
        initialValue: '1',
        error: '',
        initialError: '',
      },
      { setValue: jest.fn(), setTouched: jest.fn(), setError: jest.fn() },
    ]);
    render(<SelectField name="testField" options={options} />);
    await screen.findByTestId('field-select-select');

    // ASSERT
    expect(screen.getByTestId('field-select-select').classList).not.toContain('size-0');
    expect(screen.getByTestId('field-select-select').textContent).toBe('One');
  });

  it('should display selected option value', async () => {
    // ARRANGE
    useFieldSpy.mockReturnValue([
      { value: '3', name: 'testValue', onChange: jest.fn(), onBlur: jest.fn() },
      {
        touched: false,
        initialTouched: false,
        value: '3',
        initialValue: '3',
        error: '',
        initialError: '',
      },
      { setValue: jest.fn(), setTouched: jest.fn(), setError: jest.fn() },
    ]);
    render(<SelectField name="testField" options={options} />);
    await screen.findByTestId('field-select-select');

    // ASSERT
    expect(screen.getByTestId('field-select-select').classList).not.toContain('size-0');
    expect(screen.getByTestId('field-select-select').textContent).toBe('3');
  });

  it('should show options when autofocused', async () => {
    // ARRANGE
    useFieldSpy.mockReturnValue([
      { value: '1', name: 'testValue', onChange: jest.fn(), onBlur: jest.fn() },
      {
        touched: false,
        initialTouched: false,
        value: '1',
        initialValue: '1',
        error: '',
        initialError: '',
      },
      { setValue: jest.fn(), setTouched: jest.fn(), setError: jest.fn() },
    ]);
    render(<SelectField name="testField" options={options} autoFocus />);
    await screen.findByTestId('field-select-select');

    // ASSERT
    expect(screen.getByTestId('field-select-options').classList).not.toContain('hidden');
  });

  it('should toggle options display', async () => {
    // ARRANGE
    render(<SelectField name="testField" options={options} />);
    await screen.findByTestId('field-select');
    expect(screen.getByTestId('field-select-options').classList).toContain('hidden');

    // ACT
    await userEvent.click(screen.getByTestId('field-select-icon-expand'));

    // ASSERT
    expect(screen.getByTestId('field-select-options').classList).not.toContain('hidden');
  });

  it('should not toggle options display when disabled', async () => {
    // ARRANGE
    render(<SelectField name="testField" options={options} disabled />);
    await screen.findByTestId('field-select');
    expect(screen.getByTestId('field-select-options').classList).toContain('hidden');

    // ACT
    await userEvent.click(screen.getByTestId('field-select-icon-expand'));

    // ASSERT
    expect(screen.getByTestId('field-select-options').classList).toContain('hidden');
  });

  it('should not toggle options display when readonly', async () => {
    // ARRANGE
    render(<SelectField name="testField" options={options} readOnly />);
    await screen.findByTestId('field-select');
    expect(screen.getByTestId('field-select-options').classList).toContain('hidden');

    // ACT
    await userEvent.click(screen.getByTestId('field-select-icon-expand'));

    // ASSERT
    expect(screen.getByTestId('field-select-options').classList).toContain('hidden');
  });

  it('should select an option', async () => {
    // ARRANGE
    render(<SelectField name="testField" options={options} />);
    await screen.findByTestId('field-select');

    // ACT
    await userEvent.click(screen.getByTestId('field-select-icon-expand'));
    await userEvent.click(screen.getByTestId(`field-select-option-1`));

    // ASSERT
    expect(mockSetTouched).toHaveBeenCalledTimes(1);
    expect(mockSetValue).toHaveBeenCalledTimes(1);
  });

  it('should call onChange when provided', async () => {
    // ARRANGE
    const mockOnChange = jest.fn();
    render(<SelectField name="testField" options={options} onChange={mockOnChange} />);
    await screen.findByTestId('field-select');

    // ACT
    await userEvent.click(screen.getByTestId('field-select-icon-expand'));
    await userEvent.click(screen.getByTestId(`field-select-option-1`));

    // ASSERT
    expect(mockSetTouched).toHaveBeenCalledTimes(1);
    expect(mockSetValue).toHaveBeenCalledTimes(1);
    expect(mockOnChange).toHaveBeenCalledTimes(1);
  });

  it('should show error', async () => {
    // ARRANGE
    useFieldSpy.mockReturnValue([
      { value: '1', name: 'testValue', onChange: jest.fn(), onBlur: jest.fn() },
      {
        touched: true,
        initialTouched: false,
        value: '1',
        initialValue: '1',
        error: 'Invalid value',
        initialError: '',
      },
      { setValue: jest.fn(), setTouched: jest.fn(), setError: jest.fn() },
    ]);
    render(<SelectField name="testField" options={options} />);
    await screen.findByTestId('field-select-error');

    // ASSERT
    expect(screen.getByTestId('field-select-error')).toBeDefined();
  });
});
