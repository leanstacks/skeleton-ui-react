import { UseQueryResult } from '@tanstack/react-query';

import { render, screen } from 'test/test-utils';

import * as UseGetUser from 'api/useGetUser';
import { userFixture } from '__fixtures__/users';

import SettingsPage from '../SettingsPage';

describe('SettingsPage', () => {
  const useGetUserSpy = jest.spyOn(UseGetUser, 'useGetUser');

  beforeEach(() => {
    useGetUserSpy.mockReturnValue({
      data: userFixture,
    } as unknown as UseQueryResult<UseGetUser.User, Error>);
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
    useGetUserSpy.mockReturnValue({
      data: null,
    } as unknown as UseQueryResult<UseGetUser.User, Error>);

    render(<SettingsPage />);

    await screen.findByTestId('page-settings-header-loader');

    expect(screen.getByTestId('page-settings-header-loader')).toBeDefined();
  });
});
