import { Navigate, Route, Routes } from 'react-router-dom';

import { render, screen } from 'test/test-utils';
import * as AuthProvider from '../../../providers/AuthProvider';

import Icon from 'components/Icon/Icon';

import PrivateOutlet from '../PrivateOutlet';

describe('PrivateOutlet', () => {
  const useAuthContextSpy = jest.spyOn(AuthProvider, 'useAuthContext');

  beforeEach(() => {
    useAuthContextSpy.mockReturnValue({ isAuthenticated: true });
  });

  it('should render successfully', async () => {
    // ARRANGE
    render(
      <Routes>
        <Route path="/" element={<Navigate to="/private" />} />
        <Route path="/auth/signin" element={<Icon name="square" testId="not-authenticated" />} />
        <Route path="/private" element={<PrivateOutlet />}>
          <Route index={true} element={<Icon name="circle" testId="authenticated" />} />
        </Route>
      </Routes>,
    );
    await screen.findByTestId('authenticated');

    // ASSERT
    expect(screen.getByTestId('authenticated')).toBeDefined();
  });

  it('should render private route when authenticated', async () => {
    // ARRANGE
    render(
      <Routes>
        <Route path="/" element={<Navigate to="/private" />} />
        <Route path="/auth/signin" element={<Icon name="square" testId="not-authenticated" />} />
        <Route path="/private" element={<PrivateOutlet />}>
          <Route index={true} element={<Icon name="circle" testId="authenticated" />} />
        </Route>
      </Routes>,
    );
    await screen.findByTestId('authenticated');

    // ASSERT
    expect(screen.getByTestId('authenticated')).toBeDefined();
  });

  it('should redirect to signin route when not authenticated', async () => {
    // ARRANGE
    useAuthContextSpy.mockReturnValueOnce({ isAuthenticated: false });
    render(
      <Routes>
        <Route path="/" element={<Navigate to="/private" />} />
        <Route path="/auth/signin" element={<Icon name="square" testId="not-authenticated" />} />
        <Route path="/private" element={<PrivateOutlet />}>
          <Route index={true} element={<Icon name="circle" testId="authenticated" />} />
        </Route>
      </Routes>,
    );
    await screen.findByTestId('not-authenticated');

    // ASSERT
    expect(screen.getByTestId('not-authenticated')).toBeDefined();
  });
});
