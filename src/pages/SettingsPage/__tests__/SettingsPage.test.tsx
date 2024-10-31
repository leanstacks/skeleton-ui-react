import { beforeEach, describe, expect, it, vi } from 'vitest';
import { UseQueryResult } from '@tanstack/react-query';

import { render, screen } from 'test/test-utils';

import { User } from 'common/api/useGetUser';
import * as UseGetCurrentUser from 'common/api/useGetCurrentUser';
import { userFixture1 } from '__fixtures__/users';

import SettingsPage from '../SettingsPage';

describe('SettingsPage', () => {
  const useGetCurrentUserSpy = vi.spyOn(UseGetCurrentUser, 'useGetCurrentUser');

  beforeEach(() => {
    useGetCurrentUserSpy.mockReturnValue({
      data: userFixture1,
    } as unknown as UseQueryResult<User, Error>);
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
    useGetCurrentUserSpy.mockReturnValue({
      data: null,
    } as unknown as UseQueryResult<User, Error>);

    render(<SettingsPage />);
    await screen.findByTestId('page-settings-header-loader');

    // ASSERT
    expect(screen.getByTestId('page-settings-header-loader')).toBeDefined();
  });
});
