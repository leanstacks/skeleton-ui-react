import { render, screen } from 'test/test-utils';
import { Navigate, Route, Routes } from 'react-router-dom';

import * as AuthProvider from '../../../providers/AuthProvider';
import PrivateOutlet from '../PrivateOutlet';
import Icon from 'components/Icon/Icon';

describe('PrivateOutlet', () => {
  const useAuthContextSpy = jest.spyOn(AuthProvider, 'useAuthContext');

  beforeEach(() => {
    useAuthContextSpy.mockReturnValue({ isAuthenticated: true });
  });

  it('should render successfully', async () => {
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

    expect(screen.getByTestId('authenticated')).toBeDefined();
  });

  it('should render private route when authenticated', async () => {
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

    expect(screen.getByTestId('authenticated')).toBeDefined();
  });

  it('should redirect to signin route when not authenticated', async () => {
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

    expect(screen.getByTestId('not-authenticated')).toBeDefined();
  });
});
