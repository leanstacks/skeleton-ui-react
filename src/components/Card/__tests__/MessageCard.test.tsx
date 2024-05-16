import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

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
    expect(screen.getByTestId('card-message-title')).toHaveTextContent('Title');
  });

  it('should display icon', async () => {
    // ARRANGE
    render(<MessageCard message="Message" iconProps={{ name: 'info' }} />);
    await screen.findByTestId('card-message');

    // ASSERT
    expect(screen.getByTestId('card-message')).toBeDefined();
    expect(screen.getByTestId('card-message-icon')).toHaveTextContent('info');
  });
});
