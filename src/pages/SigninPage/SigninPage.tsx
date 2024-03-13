import SignInForm from './components/SignInForm';

/**
 * The `SigninPage` component renders a loader while determining if the
 * user is authenticated. If authenticated, routes user to authenticated
 * landing page. If not, routes user to IdP sign in page.
 * @returns {JSX.Element} JSX
 */
const SigninPage = (): JSX.Element => {
  return (
    <div data-testid="page-signin" className="px-2 sm:px-8">
      <div className="container mx-auto my-4 min-h-[50vh]">
        <SignInForm />
      </div>
    </div>
  );
};

export default SigninPage;
