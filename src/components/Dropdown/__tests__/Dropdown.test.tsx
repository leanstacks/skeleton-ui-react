import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';

import { render, screen } from 'test/test-utils';

import Dropdown from '../Dropdown';

describe('Dropdown', () => {
  it('should render successfully', async () => {
    // ARRANGE
    render(<Dropdown toggle={<div></div>} content={<div></div>} />);
    await screen.findByTestId('dropdown');

    // ASSERT
    expect(screen.getByTestId('dropdown')).toBeDefined();
  });

  it('should use custom testId', async () => {
    // ARRANGE
    render(<Dropdown toggle={<div></div>} content={<div></div>} testId="custom-testId" />);
    await screen.findByTestId('custom-testId');

    // ASSERT
    expect(screen.getByTestId('custom-testId')).toBeDefined();
  });

  it('should use custom className', async () => {
    // ARRANGE
    render(<Dropdown toggle={<div></div>} content={<div></div>} className="custom-className" />);
    await screen.findByTestId('dropdown');

    // ASSERT
    expect(screen.getByTestId('dropdown').classList).toContain('custom-className');
  });

  it('should toggle visibility using toggle', async () => {
    // ARRANGE
    render(<Dropdown toggle={<div></div>} content={<div></div>} />);
    await screen.findByTestId('dropdown');

    // ASSERT CONTENT HIDDEN
    expect(screen.getByTestId('dropdown-content').classList).toContain('hidden');

    // ACT
    await userEvent.click(screen.getByTestId('dropdown-toggle'));

    // ASSERT CONTENT NOT HIDDEN
    expect(screen.getByTestId('dropdown-content').classList).not.toContain('hidden');
  });

  it('should toggle visibility using backdrop', async () => {
    // ARRANGE
    render(<Dropdown toggle={<div></div>} content={<div></div>} />);
    await screen.findByTestId('dropdown');

    // ACT - SHOW CONTENT
    await userEvent.click(screen.getByTestId('dropdown-toggle'));

    // ASSERT CONTENT NOT HIDDEN
    expect(screen.getByTestId('dropdown-content').classList).not.toContain('hidden');

    // ACT - CLICK BACKDROP
    await userEvent.click(screen.getByTestId('dropdown-backdrop'));

    // ASSERT CONTENT HIDDEN
    expect(screen.getByTestId('dropdown-content').classList).toContain('hidden');
  });

  it('should toggle visibility using content', async () => {
    // ARRANGE
    render(<Dropdown toggle={<div></div>} content={<div></div>} />);
    await screen.findByTestId('dropdown');

    // ACT - SHOW CONTENT
    await userEvent.click(screen.getByTestId('dropdown-toggle'));

    // ASSERT CONTENT NOT HIDDEN
    expect(screen.getByTestId('dropdown-content').classList).not.toContain('hidden');

    // ACT - CLICK CONTENT
    await userEvent.click(screen.getByTestId('dropdown-content'));

    // ASSERT CONTENT HIDDEN
    expect(screen.getByTestId('dropdown-content').classList).toContain('hidden');
  });
});
