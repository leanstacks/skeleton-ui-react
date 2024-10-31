import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';

import MessageCard from '../MessageCard';

describe('MessageCard', () => {
  it('should render successfully', async () => {
    // ARRANGE
    render(<MessageCard message="Message" />);
    await screen.findByTestId('card-message');

    // ASSERT
    expect(screen.getByTestId('card-message')).toBeDefined();
    expect(screen.getByTestId('card-message-message')).toBeDefined();
  });

  it('should use custom testId', async () => {
    // ARRANGE
    render(<MessageCard message="Message" testId="custom-testId" />);
    await screen.findByTestId('custom-testId');

    // ASSERT
    expect(screen.getByTestId('custom-testId')).toBeDefined();
  });

  it('should use custom className', async () => {
    // ARRANGE
    render(<MessageCard message="Message" className="custom-className" />);
    await screen.findByTestId('card-message');

    // ASSERT
    expect(screen.getByTestId('card-message').classList).toContain('custom-className');
  });

  it('should display title', async () => {
    // ARRANGE
    render(<MessageCard message="Message" title="Title" />);
    await screen.findByTestId('card-message');

    // ASSERT
    expect(screen.getByTestId('card-message')).toBeDefined();
    expect(screen.getByTestId('card-message-title').textContent).toBe('Title');
  });

  it('should display icon', async () => {
    // ARRANGE
    render(<MessageCard message="Message" iconProps={{ icon: 'circleInfo' }} />);
    await screen.findByTestId('card-message');

    // ASSERT
    expect(screen.getByTestId('card-message')).toBeDefined();
    expect(screen.getByTestId('card-message-icon')).toHaveAttribute('data-icon', 'circle-info');
  });
});
