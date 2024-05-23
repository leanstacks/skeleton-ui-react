import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';

import SettingsHeading from '../SettingsHeading';

describe('SettingsHeading', () => {
  it('should render successfully', async () => {
    // ARRANGE
    render(<SettingsHeading>Test</SettingsHeading>);
    await screen.findByTestId('settings-heading');

    // ASSERT
    expect(screen.getByTestId('settings-heading')).toBeDefined();
    expect(screen.getByText('Test')).toBeDefined();
  });

  it('should use custom testId', async () => {
    // ARRANGE
    render(<SettingsHeading testId="custom-testId">Test</SettingsHeading>);
    await screen.findByTestId('custom-testId');

    // ASSERT
    expect(screen.getByTestId('custom-testId')).toBeDefined();
  });
});
