import userEvent from '@testing-library/user-event';

import { render, screen } from 'test/test-utils';
import * as ToastsProvider from 'providers/ToastsProvider';
import { currentUserFixture, userWithIdentities } from '__fixtures__/users';

import ChangePasswordForm from '../ChangePasswordForm';

describe('ChangePasswordForm', () => {
  const useToastsSpy = jest.spyOn(ToastsProvider, 'useToasts');
  const mockCreateToast = jest.fn();

  beforeEach(() => {
    useToastsSpy.mockReturnValue({
      toasts: [],
      removeToast: jest.fn(),
      createToast: mockCreateToast,
    });
  });

  it('should render successfully', async () => {
    render(<ChangePasswordForm user={currentUserFixture[0]} />);

    await screen.findByTestId('form-password-change');

    expect(screen.getByTestId('form-password-change')).toBeDefined();
  });

  it('should use custom testId', async () => {
    render(<ChangePasswordForm user={currentUserFixture[0]} testId="custom-testId" />);

    await screen.findByTestId('custom-testId');

    expect(screen.getByTestId('custom-testId')).toBeDefined();
  });

  it('should render user with identities', async () => {
    render(<ChangePasswordForm user={userWithIdentities} />);

    await screen.findByTestId('form-password-change-identities');

    expect(screen.getByTestId('form-password-change-identities').textContent).toContain(
      userWithIdentities.identities?.[0].providerName,
    );
  });

  it('should submit form', async () => {
    // ARRANGE
    render(<ChangePasswordForm user={currentUserFixture[0]} />);
    await screen.findByTestId('form-password-change');

    // ACT
    await userEvent.type(screen.getByLabelText('New password'), 'myStr0ngP@ssword');
    await userEvent.type(screen.getByLabelText('Confirm password'), 'myStr0ngP@ssword');
    await userEvent.click(screen.getByTestId('form-password-change-button-submit'));

    // ASSERT
    expect(mockCreateToast).toHaveBeenCalledTimes(1);
  });
});
