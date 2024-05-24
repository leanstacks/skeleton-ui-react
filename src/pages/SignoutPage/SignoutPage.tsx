import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import LoaderSpinner from 'components/Loader/LoaderSpinner';
import { useSignout } from './api/useSignout';
import Page from 'components/Page/Page';

/**
 * The `SignoutPage` component deauthenticates the current user and redirects
 * to the base URL.
 * @returns {JSX.Element} JSX
 */
const SignoutPage = (): JSX.Element => {
  const navigate = useNavigate();
  const { mutate: signout } = useSignout();

  useEffect(() => {
    signout(undefined, {
      onSuccess: () => {
        // setTimeout to simulate network latency or OAuth IdP redirect
        setTimeout(() => {
          navigate('/');
        }, 1000);
      },
    });
  }, [signout, navigate]);

  return (
    <Page testId="page-signout">
      <div className="container mx-auto h-[50vh]">
        <div className="flex h-full items-center justify-center text-2xl">
          <LoaderSpinner text="Signing out..." />
        </div>
      </div>
    </Page>
  );
};

export default SignoutPage;
