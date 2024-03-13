import userEvent from '@testing-library/user-event';

import { render, screen, waitFor } from 'test/test-utils';
import { userWithoutIdentities } from '__fixtures__/users';

import DeactivateAccount from '../DeactivateAccount';

const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => {
  const originalModule = jest.requireActual('react-router-dom');
  return {
    ...originalModule,
    useNavigate: () => mockNavigate,
  };
});

describe('DeactivateAccount', () => {
  it('should render successfully', async () => {
    render(<DeactivateAccount user={userWithoutIdentities} />);

    await screen.findByTestId('account-deactivate');

    expect(screen.getByTestId('account-deactivate')).toBeDefined();
  });

  it('should use custom testId', async () => {
    render(<DeactivateAccount user={userWithoutIdentities} testId="custom-testId" />);

    await screen.findByTestId('custom-testId');

    expect(screen.getByTestId('custom-testId')).toBeDefined();
  });

  it('should use custom className', async () => {
    render(<DeactivateAccount user={userWithoutIdentities} className="custom-className" />);

    await screen.findByTestId('account-deactivate');

    expect(screen.getByTestId('account-deactivate').classList).toContain('custom-className');
  });

  it('should show confirmation', async () => {
    // ARRANGE
    render(<DeactivateAccount user={userWithoutIdentities} />);
    await screen.findByTestId('account-deactivate');

    // ACT
    await userEvent.click(screen.getByTestId('account-deactivate-button-deactivate'));

    // ASSERT
    expect(screen.getByTestId('account-deactivate-button-confirm').classList).not.toContain(
      'hidden',
    );
  });

  it('should cancel deactivation', async () => {
    // ARRANGE
    render(<DeactivateAccount user={userWithoutIdentities} />);
    await screen.findByTestId('account-deactivate');

    // ACT
    await userEvent.click(screen.getByTestId('account-deactivate-button-deactivate'));
    expect(screen.getByTestId('account-deactivate-block-confirm').classList).not.toContain(
      'hidden',
    );
    await userEvent.click(screen.getByTestId('account-deactivate-button-cancel'));

    // ASSERT
    expect(screen.getByTestId('account-deactivate-block-confirm').classList).toContain('hidden');
  });

  it('should deactivate account', async () => {
    // ARRANGE
    render(<DeactivateAccount user={userWithoutIdentities} />);
    await screen.findByTestId('account-deactivate');

    // ACT
    await userEvent.click(screen.getByTestId('account-deactivate-button-deactivate'));
    expect(screen.getByTestId('account-deactivate-block-confirm').classList).not.toContain(
      'hidden',
    );
    await userEvent.click(screen.getByTestId('account-deactivate-button-confirm'));
    await waitFor(() => expect(mockNavigate).toHaveBeenCalled());

    // ASSERT
    expect(mockNavigate).toHaveBeenCalledTimes(1);
    expect(mockNavigate).toHaveBeenCalledWith('/auth/signout');
  });
});
