import { render, screen } from '@testing-library/react';
import Icon from '../Icon';

describe('Icon', () => {
  it('should render successfully', async () => {
    render(<Icon name="circle" />);

    await screen.findByTestId('icon');

    expect(screen.getByTestId('icon')).toBeDefined();
  });

  it('should render custom testId', async () => {
    render(<Icon name="circle" testId="test" />);

    await screen.findByTestId('test');

    expect(screen.getByTestId('test')).toBeDefined();
  });

  it('should render font variation settings', async () => {
    const { rerender } = render(<Icon name="circle" />);

    await screen.findByTestId('icon');

    expect(screen.getByTestId('icon')).toBeDefined();
    expect(screen.getByTestId('icon').getAttribute('style')).toBe(
      "font-variation-settings: 'FILL' 1, 'wght' 400, 'GRAD' 0, 'opsz' 24;",
    );

    rerender(<Icon name="circle" fill={0} />);

    await screen.findByTestId('icon');

    expect(screen.getByTestId('icon').getAttribute('style')).toBe(
      "font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24;",
    );

    rerender(<Icon name="circle" weight={100} />);

    await screen.findByTestId('icon');

    expect(screen.getByTestId('icon').getAttribute('style')).toBe(
      "font-variation-settings: 'FILL' 1, 'wght' 100, 'GRAD' 0, 'opsz' 24;",
    );

    rerender(<Icon name="circle" grade={100} />);

    await screen.findByTestId('icon');

    expect(screen.getByTestId('icon').getAttribute('style')).toBe(
      "font-variation-settings: 'FILL' 1, 'wght' 400, 'GRAD' 100, 'opsz' 24;",
    );

    rerender(<Icon name="circle" opticalSize={48} />);

    await screen.findByTestId('icon');

    expect(screen.getByTestId('icon').getAttribute('style')).toBe(
      "font-variation-settings: 'FILL' 1, 'wght' 400, 'GRAD' 0, 'opsz' 48;",
    );
  });

  it('should use default fill value when invalid prop', async () => {
    // @ts-expect-error
    render(<Icon name="circle" fill={3} />);

    await screen.findByTestId('icon');

    expect(screen.getByTestId('icon').getAttribute('style')).toBe(
      "font-variation-settings: 'FILL' 1, 'wght' 400, 'GRAD' 0, 'opsz' 24;",
    );
  });

  it('should use default weight value when invalid prop', async () => {
    // @ts-expect-error
    render(<Icon name="circle" weight={0} />);

    await screen.findByTestId('icon');

    expect(screen.getByTestId('icon').getAttribute('style')).toBe(
      "font-variation-settings: 'FILL' 1, 'wght' 400, 'GRAD' 0, 'opsz' 24;",
    );
  });

  it('should use default grade value when invalid prop', async () => {
    render(<Icon name="circle" grade={500} />);

    await screen.findByTestId('icon');

    expect(screen.getByTestId('icon').getAttribute('style')).toBe(
      "font-variation-settings: 'FILL' 1, 'wght' 400, 'GRAD' 0, 'opsz' 24;",
    );
  });

  it('should use default optical size value when invalid prop', async () => {
    render(<Icon name="circle" opticalSize={100} />);

    await screen.findByTestId('icon');

    expect(screen.getByTestId('icon').getAttribute('style')).toBe(
      "font-variation-settings: 'FILL' 1, 'wght' 400, 'GRAD' 0, 'opsz' 24;",
    );
  });
});
