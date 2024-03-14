import { render, screen } from '@testing-library/react';

import SettingsHeading from '../SettingsHeading';

describe('SettingsHeading', () => {
  it('should render successfully', async () => {
    render(<SettingsHeading>Test</SettingsHeading>);

    await screen.findByTestId('settings-heading');

    expect(screen.getByTestId('settings-heading')).toBeDefined();
    expect(screen.getByText('Test')).toBeDefined();
  });

  it('should use custom testId', async () => {
    render(<SettingsHeading testId="custom-testId">Test</SettingsHeading>);

    await screen.findByTestId('custom-testId');

    expect(screen.getByTestId('custom-testId')).toBeDefined();
  });
});
