import { describe, expect, it } from 'vitest';

import { render, screen } from 'test/test-utils';

import DropdownContent from '../DropdownContent';

describe('DropdownContent', () => {
  it('should render successfully', async () => {
    // ARRANGE
    render(<DropdownContent />);
    await screen.findByTestId('dropdown-content');

    // ASSERT
    expect(screen.getByTestId('dropdown-content')).toBeDefined();
  });

  it('should use custom testId', async () => {
    // ARRANGE
    render(<DropdownContent testId="custom-testId" />);
    await screen.findByTestId('custom-testId');

    // ASSERT
    expect(screen.getByTestId('custom-testId')).toBeDefined();
  });

  it('should use custom className', async () => {
    // ARRANGE
    render(<DropdownContent className="custom-className" />);
    await screen.findByTestId('dropdown-content');

    // ASSERT
    expect(screen.getByTestId('dropdown-content').classList).toContain('custom-className');
  });
});
