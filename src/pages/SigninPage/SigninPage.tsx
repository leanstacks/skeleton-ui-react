import Page from 'components/Page/Page';
import SigninForm from './components/SigninForm';

/**
 * The `SigninPage` component renders the content for a user authentication
 * page.
 * @returns {JSX.Element} JSX
 */
const SigninPage = (): JSX.Element => {
  return (
    <Page testId="page-signin">
      <div className="container mx-auto min-h-[50vh]">
        <div className="my-6">
          <div className="mb-4 border-b border-neutral-500/50 pb-2 text-4xl">Sign In</div>
          <SigninForm />
        </div>
      </div>
    </Page>
  );
};

export default SigninPage;
