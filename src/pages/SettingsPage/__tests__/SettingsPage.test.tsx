import { UseQueryResult } from '@tanstack/react-query';

import { render, screen } from 'test/test-utils';

import * as UseGetUser from 'api/useGetUser';
import { userFixture1 } from '__fixtures__/users';

import SettingsPage from '../SettingsPage';

describe('SettingsPage', () => {
  const useGetUserSpy = jest.spyOn(UseGetUser, 'useGetUser');

  beforeEach(() => {
    useGetUserSpy.mockReturnValue({
      data: userFixture1,
    } as unknown as UseQueryResult<UseGetUser.User, Error>);
  });

  it('should render successfully', async () => {
    // ARRANGE
    render(<SettingsPage />);
    await screen.findByTestId('page-settings');

    // ASSERT
    expect(screen.getByTestId('page-settings')).toBeDefined();
  });

  it('should render header information', async () => {
    // ARRANGE
    render(<SettingsPage />);
    await screen.findByTestId('page-settings-header');

    // ASSERT
    expect(screen.getByTestId('page-settings-header')).toBeDefined();
  });

  it('should render header loader', async () => {
    // ARRANGE
    useGetUserSpy.mockReturnValue({
      data: null,
    } as unknown as UseQueryResult<UseGetUser.User, Error>);

    render(<SettingsPage />);
    await screen.findByTestId('page-settings-header-loader');

    // ASSERT
    expect(screen.getByTestId('page-settings-header-loader')).toBeDefined();
  });
});
