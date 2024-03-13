import { render, screen } from '@testing-library/react';

import App from './App';

describe('App', () => {
  it('should render successfully', async () => {
    render(<App />);

    await screen.findByTestId('app');

    expect(screen.getByTestId('app')).toBeDefined();
  });
});
