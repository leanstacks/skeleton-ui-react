import { describe, expect, it, vi } from 'vitest';
import { render, screen } from 'test/test-utils';
import UserListItem from '../UserListItem';
import { userFixture1 } from '__fixtures__/users';
import userEvent from '@testing-library/user-event';

// mock select functions from react-router-dom
const mockNavigate = vi.fn();
vi.mock('react-router-dom', async () => {
  const original = await vi.importActual('react-router-dom');
  return {
    ...original,
    useNavigate: () => mockNavigate,
  };
});

describe('UserListItem', () => {
  it('should render successfully', async () => {
    // ARRANGE
    render(<UserListItem user={userFixture1} />);
    await screen.findByTestId('list-item-user');

    // ASSERT
    expect(screen.getByTestId('list-item-user')).toBeDefined();
  });

  it('should use custom testId', async () => {
    // ARRANGE
    render(<UserListItem user={userFixture1} testId="custom-testId" />);
    await screen.findByTestId('custom-testId');

    // ASSERT
    expect(screen.getByTestId('custom-testId')).toBeDefined();
  });

  it('should use custom className', async () => {
    // ARRANGE
    render(<UserListItem user={userFixture1} className="custom-className" />);
    await screen.findByTestId('list-item-user');

    // ASSERT
    expect(screen.getByTestId('list-item-user').classList).toContain('custom-className');
  });

  it('should use inactive styles', async () => {
    // ARRANGE
    render(<UserListItem user={userFixture1} />);
    await screen.findByTestId('list-item-user');

    // ASSERT
    expect(screen.getByTestId('list-item-user').classList).toContain('border-b-neutral-500/10');
  });

  it('should use active styles', async () => {
    // ARRANGE
    render(<UserListItem user={userFixture1} isActive />);
    await screen.findByTestId('list-item-user');

    // ASSERT
    expect(screen.getByTestId('list-item-user').classList).toContain('border-b-blue-300');
  });

  it('should navigate when clicked', async () => {
    // ARRANGE
    render(<UserListItem user={userFixture1} />);
    await screen.findByTestId('list-item-user');

    // ACT
    await userEvent.click(screen.getByTestId('list-item-user'));

    // ASSERT
    expect(mockNavigate).toHaveBeenCalled();
  });
});
