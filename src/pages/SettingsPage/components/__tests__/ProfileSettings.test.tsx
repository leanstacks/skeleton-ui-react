import { UseQueryResult } from '@tanstack/react-query';
import userEvent from '@testing-library/user-event';

import { render, screen } from 'test/test-utils';

import { currentUserFixture } from '__fixtures__/users';
import * as UseGetCurrentUser from 'api/useGetCurrentUser';
import * as ToastsProvider from 'providers/ToastsProvider';

import ProfileSettings from '../ProfileSettings';

describe('ProfileSettings', () => {
  const useGetCurrentUserSpy = jest.spyOn(UseGetCurrentUser, 'useGetCurrentUser');
  const useToastsSpy = jest.spyOn(ToastsProvider, 'useToasts');
  const mockCreateToast = jest.fn();

  beforeEach(() => {
    useGetCurrentUserSpy.mockReturnValue({
      data: currentUserFixture[0],
    } as unknown as UseQueryResult<UseGetCurrentUser.User, Error>);

    useToastsSpy.mockReturnValue({
      toasts: [],
      removeToast: jest.fn(),
      createToast: mockCreateToast,
    });
  });

  it('should render successfully', async () => {
    render(<ProfileSettings />);

    await screen.findByTestId('settings-profile');

    expect(screen.getByTestId('settings-profile')).toBeDefined();
  });

  it('should use custom testId', async () => {
    render(<ProfileSettings testId="custom-testId" />);

    await screen.findByTestId('custom-testId');

    expect(screen.getByTestId('custom-testId')).toBeDefined();
  });

  it('should render loader', async () => {
    useGetCurrentUserSpy.mockReturnValue({
      data: undefined,
    } as unknown as UseQueryResult<UseGetCurrentUser.User, Error>);
    render(<ProfileSettings />);
    await screen.findByTestId('settings-profile-loader');

    expect(screen.getByTestId('settings-profile-loader')).toBeDefined();
  });

  it('should submit form', async () => {
    render(<ProfileSettings />);
    await screen.findByTestId('settings-profile-form');

    await userEvent.type(screen.getByLabelText('First name'), 'Unit');
    await userEvent.type(screen.getByLabelText('Last name'), 'Tester');
    await userEvent.type(screen.getByLabelText('Display name'), 'unit_tester');
    await userEvent.click(screen.getByTestId('settings-profile-button-submit'));

    expect(mockCreateToast).toHaveBeenCalledTimes(1);
  });
});
