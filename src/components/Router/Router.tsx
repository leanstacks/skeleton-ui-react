import { Navigate, RouteObject, createBrowserRouter } from 'react-router-dom';

import StandardLayout from 'components/Layout/StandardLayout';
import ErrorPage from 'pages/ErrorPage/ErrorPage';
import PrivateOutlet from './PrivateOutlet';
import LandingPage from 'pages/LandingPage/LandingPage';
import SigninPage from 'pages/SigninPage/SigninPage';
import SignoutPage from 'pages/SignoutPage/SignoutPage';
import DashboardPage from 'pages/DashboardPage/DashboardPage';
import SettingsPage from 'pages/SettingsPage/SettingsPage';
import ProfileSettings from 'pages/SettingsPage/components/ProfileSettings';
import AppearanceSettings from 'pages/SettingsPage/components/AppearanceSettings';

/**
 * The React Router configuration. An array of `RouteObject`.
 * @see {@link RouteObject}
 */
export const routes: RouteObject[] = [
  {
    path: '/',
    element: <StandardLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <LandingPage />,
      },
      {
        path: 'auth/signin',
        element: <SigninPage />,
      },
      {
        path: 'auth/signout',
        element: <SignoutPage />,
      },
      {
        path: 'app',
        element: <PrivateOutlet />,
        children: [
          { index: true, element: <DashboardPage /> },
          {
            path: 'settings',
            element: <SettingsPage />,
            children: [
              {
                index: true,
                element: <Navigate to="profile" />,
              },
              {
                path: 'profile',
                element: <ProfileSettings />,
              },
              {
                path: 'appearance',
                element: <AppearanceSettings />,
              },
            ],
          },
        ],
      },
    ],
  },
];

/**
 * The application `Router`. A React Router instance.
 */
export const router = createBrowserRouter(routes);
