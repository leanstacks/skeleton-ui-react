import { Navigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { useAuth } from 'common/hooks/useAuth';
import Page from 'common/components/Page/Page';

/**
 * The `LandingPage` component renders the content of the landing page
 * for unauthenticated users. This is the public landing page.
 *
 * If an authenticated user navigates to this page, they are redirected to
 * the `DashboardPage`.
 * @returns {JSX.Element} JSX
 */
const LandingPage = (): JSX.Element => {
  const { t } = useTranslation();
  const authContext = useAuth();

  if (authContext.isAuthenticated) {
    return <Navigate to="/app" />;
  }

  return (
    <Page testId="page-landing">
      <div className="container mx-auto min-h-[50vh]">
        <h1 className="mb-4 pt-32 text-4xl md:mb-8 md:text-8xl">
          {t('letsGetStarted', { ns: 'common' })}
        </h1>

        <div className="opacity-60 md:text-2xl">{t('creatingReactApps', { ns: 'common' })}</div>
      </div>
    </Page>
  );
};

export default LandingPage;
