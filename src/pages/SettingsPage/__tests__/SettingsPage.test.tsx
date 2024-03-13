import { UseQueryResult } from '@tanstack/react-query';

import { render, screen } from 'test/test-utils';

import * as UseGetCurrentUser from 'api/useGetCurrentUser';
import { currentUserFixture } from '__fixtures__/users';

import SettingsPage from '../SettingsPage';

describe('SettingsPage', () => {
  const useGetCurrentUserSpy = jest.spyOn(UseGetCurrentUser, 'useGetCurrentUser');

  beforeEach(() => {
    useGetCurrentUserSpy.mockReturnValue({
      data: currentUserFixture[0],
    } as unknown as UseQueryResult<UseGetCurrentUser.User, Error>);
  });

  it('should render successfully', async () => {
    render(<SettingsPage />);

    await screen.findByTestId('page-settings');

    expect(screen.getByTestId('page-settings')).toBeDefined();
  });

  it('should render header information', async () => {
    render(<SettingsPage />);

    await screen.findByTestId('page-settings-header');

    expect(screen.getByTestId('page-settings-header')).toBeDefined();
  });

  it('should render header loader', async () => {
    useGetCurrentUserSpy.mockReturnValue({
      data: null,
    } as unknown as UseQueryResult<UseGetCurrentUser.User, Error>);

    render(<SettingsPage />);

    await screen.findByTestId('page-settings-header-loader');

    expect(screen.getByTestId('page-settings-header-loader')).toBeDefined();
  });
});
