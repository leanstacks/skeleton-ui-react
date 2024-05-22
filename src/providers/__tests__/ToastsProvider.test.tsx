import { describe, expect, it } from 'vitest';
import { render as renderWithoutWrapper } from '@testing-library/react';

import { screen } from 'test/test-utils';

import ToastsProvider from 'providers/ToastsProvider';

describe('ToastsProvider', () => {
  it('should render successfully', async () => {
    // ARRANGE
    renderWithoutWrapper(
      <ToastsProvider>
        <div data-testid="provider-toasts"></div>
      </ToastsProvider>,
    );
    await screen.findByTestId('provider-toasts');

    // ASSERT
    expect(screen.getByTestId('provider-toasts')).toBeDefined();
  });
});
