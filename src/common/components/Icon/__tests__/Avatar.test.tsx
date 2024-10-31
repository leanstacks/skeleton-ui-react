import { describe, expect, it } from 'vitest';
import { render, screen } from 'test/test-utils';

import Avatar from '../Avatar';

describe('Avatar', () => {
  it('should render successfully', async () => {
    // ARRANGE
    render(<Avatar value="test" />);
    await screen.findByTestId('icon-avatar');

    // ASSERT
    expect(screen.getByTestId('icon-avatar')).toBeDefined();
  });

  it('should render custom testId', async () => {
    // ARRANGE
    render(<Avatar value="test" testId="custom-testid" />);
    await screen.findByTestId('custom-testid');

    // ASSERT
    expect(screen.getByTestId('custom-testid')).toBeDefined();
  });

  it('should render custom className', async () => {
    // ARRANGE
    render(<Avatar value="test" className="custom-classname" />);
    await screen.findByTestId('icon-avatar');

    // ASSERT
    expect(screen.getByTestId('icon-avatar').classList).toContain('custom-classname');
  });

  it('should render picture', async () => {
    // ARRANGE
    const imageSource = 'https://placehold.co/32x32.png';
    render(<Avatar value="test" picture={imageSource} />);
    await screen.findByTestId('icon-avatar');

    // ASSERT
    expect(screen.getByTestId('icon-avatar').getAttribute('src')).toBe(imageSource);
  });

  it('should render default initial when no value provided', async () => {
    // ARRANGE
    render(<Avatar value=" " />);
    await screen.findByTestId('icon-avatar');

    // ASSERT
    expect(screen.getByTestId('icon-avatar').textContent).toBe('?');
  });
});
