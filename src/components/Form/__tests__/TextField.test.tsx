import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import * as FormikLibrary from 'formik';

import TextField from '../TextField';

describe('TextField', () => {
  const useFieldSpy = jest.spyOn(FormikLibrary, 'useField');

  beforeEach(() => {
    useFieldSpy.mockReturnValue([
      { value: '', name: 'testValue', onChange: jest.fn(), onBlur: jest.fn() },
      {
        touched: false,
        initialTouched: false,
        value: '',
        initialValue: '',
        error: '',
        initialError: '',
      },
      { setValue: jest.fn(), setTouched: jest.fn(), setError: jest.fn() },
    ]);
  });

  it('should render successfully', async () => {
    // ARRANGE
    render(<TextField name="testValue" />);
    await screen.findByTestId('field-text');

    // ASSERT
    expect(screen.getByTestId('field-text')).toBeDefined();
  });

  it('should render custom testId', async () => {
    // ARRANGE
    render(<TextField name="testValue" testId="custom-testid" />);
    await screen.findByTestId('custom-testid');

    // ASSERT
    expect(screen.getByTestId('custom-testid')).toBeDefined();
  });

  it('should render custom className', async () => {
    // ARRANGE
    render(<TextField name="testValue" className="custom-className" />);
    await screen.findByTestId('field-text');

    // ASSERT
    expect(screen.getByTestId('field-text').classList).toContain('custom-className');
  });

  it('should show input when field has value', async () => {
    // ARRANGE
    useFieldSpy.mockReturnValue([
      { value: 'A', name: 'testValue', onChange: jest.fn(), onBlur: jest.fn() },
      {
        touched: false,
        initialTouched: false,
        value: 'A',
        initialValue: 'A',
        error: '',
        initialError: '',
      },
      { setValue: jest.fn(), setTouched: jest.fn(), setError: jest.fn() },
    ]);
    render(<TextField name="testValue" />);
    await screen.findByTestId('field-text-input');

    // ASSERT
    expect(screen.queryByTestId('field-text-input')?.classList).not.toContain('size-0');
  });

  it('should show input when field autofocused', async () => {
    // ARRANGE
    useFieldSpy.mockReturnValue([
      { value: '', name: 'testValue', onChange: jest.fn(), onBlur: jest.fn() },
      {
        touched: false,
        initialTouched: false,
        value: '',
        initialValue: '',
        error: '',
        initialError: '',
      },
      { setValue: jest.fn(), setTouched: jest.fn(), setError: jest.fn() },
    ]);
    render(<TextField name="testValue" autoFocus />);
    await screen.findByTestId('field-text-input');

    // ASSERT
    expect(screen.queryByTestId('field-text-input')?.classList).not.toContain('size-0');
  });

  it('should not show input when field has no value', async () => {
    // ARRANGE
    useFieldSpy.mockReturnValue([
      { value: '', name: 'testValue', onChange: jest.fn(), onBlur: jest.fn() },
      {
        touched: false,
        initialTouched: false,
        value: '',
        initialValue: '',
        error: '',
        initialError: '',
      },
      { setValue: jest.fn(), setTouched: jest.fn(), setError: jest.fn() },
    ]);
    render(<TextField name="testValue" />);
    await screen.findByTestId('field-text-input');

    // ASSERT
    expect(screen.queryByTestId('field-text-input')?.classList).toContain('size-0');
  });

  it('should hide input when empty field blurred', async () => {
    // ARRANGE
    useFieldSpy.mockReturnValue([
      { value: '', name: 'testValue', onChange: jest.fn(), onBlur: jest.fn() },
      {
        touched: false,
        initialTouched: false,
        value: '',
        initialValue: '',
        error: '',
        initialError: '',
      },
      { setValue: jest.fn(), setTouched: jest.fn(), setError: jest.fn() },
    ]);
    render(
      <div>
        <div data-testid="blur"></div>
        <TextField name="testValue" />
      </div>,
    );
    await screen.findByTestId('field-text-input');
    expect(screen.queryByTestId('field-text-input')?.classList).toContain('size-0');

    // ACT
    // focus
    await userEvent.click(screen.getByTestId('field-text'));
    // blur
    fireEvent.blur(screen.getByTestId('field-text'));

    // ASSERT
    expect(screen.queryByTestId('field-text-input')?.classList).toContain('size-0');
  });

  it('should render label when provided', async () => {
    // ARRANGE
    render(<TextField name="testValue" label="testLabel" />);
    await screen.findByTestId('field-text-label');

    // ASSERT
    expect(screen.getByTestId('field-text-label').textContent).toBe('testLabel');
  });

  it('should not render label when omitted', async () => {
    // ARRANGE
    render(<TextField name="testValue" />);
    await screen.findByTestId('field-text');

    // ASSERT
    expect(screen.queryByTestId('field-text-label')).toBeNull();
  });

  it('should render supporting text when provided', async () => {
    // ARRANGE
    render(<TextField name="testValue" supportingText="testText" />);
    await screen.findByTestId('field-text-supporting-text');

    // ASSERT
    expect(screen.getByTestId('field-text-supporting-text').textContent).toBe('testText');
  });

  it('should not render supporting text when omitted', async () => {
    // ARRANGE
    render(<TextField name="testValue" />);
    await screen.findByTestId('field-text');

    // ASSERT
    expect(screen.queryByTestId('field-text-supporting-text')).toBeNull();
  });

  it('should render error message when input is not valid', async () => {
    // ARRANGE
    useFieldSpy.mockReturnValue([
      { value: '', name: 'testValue', onChange: jest.fn(), onBlur: jest.fn() },
      {
        touched: true,
        initialTouched: false,
        value: 'A',
        initialValue: '',
        error: 'Invalid',
        initialError: '',
      },
      { setValue: jest.fn(), setTouched: jest.fn(), setError: jest.fn() },
    ]);
    render(<TextField name="testValue" />);
    await screen.findByTestId('field-text-error');

    // ASSERT
    expect(screen.getByTestId('field-text-error')).toBeDefined();
  });

  it('should not be focusable when disabled', async () => {
    // ARRANGE
    render(<TextField name="testValue" disabled />);
    await screen.findByTestId('field-text');
    expect(screen.getByTestId('field-text-input').classList).toContain('size-0');

    // ACT
    await userEvent.click(screen.getByTestId('field-text'));

    // ASSERT
    expect(screen.getByTestId('field-text-input').classList).toContain('size-0');
  });
});
