import { Navigate, RouteObject, createBrowserRouter } from 'react-router-dom';

import StandardLayout from 'components/Layout/StandardLayout';
import ErrorPage from 'pages/ErrorPage/ErrorPage';
import PrivateOutlet from './PrivateOutlet';
import LandingPage from 'pages/LandingPage/LandingPage';
import DashboardPage from 'pages/DashboardPage/DashboardPage';
import SettingsPage from 'pages/SettingsPage/SettingsPage';
import AppearanceSettings from 'pages/SettingsPage/components/AppearanceSettings';
import ComponentsPage from 'pages/ComponentsPage/ComponentsPage';
import TextComponents from 'pages/ComponentsPage/components/TextComponents';
import ButtonComponents from 'pages/ComponentsPage/components/ButtonComponents';
import UsersPage from 'pages/UsersPage/UsersPage';
import UserDetailLayout from 'pages/UsersPage/components/UserDetailLayout';
import UserDetail from 'pages/UsersPage/components/UserDetail';

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
        path: 'app',
        children: [
          { index: true, element: <DashboardPage /> },
          {
            path: 'settings',
            element: <SettingsPage />,
            children: [
              {
                index: true,
                element: <Navigate to="appearance" />,
              },
              {
                path: 'appearance',
                element: <AppearanceSettings />,
              },
            ],
          },
          {
            path: 'components',
            element: <ComponentsPage />,
            children: [
              {
                index: true,
                element: <Navigate to="text" />,
              },
              {
                path: 'text',
                element: <TextComponents />,
              },
              {
                path: 'button',
                element: <ButtonComponents />,
              },
            ],
          },
          {
            path: 'users',
            element: <UsersPage />,
            children: [
              {
                path: ':userId',
                element: <UserDetailLayout />,
                children: [
                  { index: true, element: <UserDetail /> },
                  {
                    path: 'tasks',
                    element: <div>PLACEHOLDER: User Task List</div>,
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        path: 'private',
        element: <PrivateOutlet />,
        children: [{ index: true, element: <DashboardPage /> }],
      },
    ],
  },
];

/**
 * The application `Router`. A React Router instance.
 */
export const router = createBrowserRouter(routes);
