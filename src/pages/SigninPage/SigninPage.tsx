import { Form, Formik } from 'formik';
import { object, string } from 'yup';
import { useNavigate } from 'react-router-dom';
import { Button } from '@leanstacks/react-common';

import { useSignin } from './api/useSignin';
import TextField from 'components/Form/TextField';
import Page from 'components/Page/Page';

/**
 * Signin form values.
 */
type SigninFormValues = {
  username: string;
  password: string;
};

/**
 * Signin form validation schema.
 */
const validationSchema = object<SigninFormValues>({
  password: string()
    .matches(/[0-9]/, 'Must have a number. ')
    .matches(/[a-z]/, 'Must have a lowercase letter. ')
    .matches(/[A-Z]/, 'Must have an uppercase letter. ')
    .matches(/[$*.[{}()?"!@#%&/,><':;|_~`^\]\\]/, 'Must have a special character. ')
    .min(12, 'Must have at least 12 characters. ')
    .required('Required. '),
  username: string().required('Required.'),
});

/**
 * The `SigninPage` component renders the content for a user authentication
 * page.
 * @returns {JSX.Element} JSX
 */
const SigninPage = (): JSX.Element => {
  const { mutate: signin } = useSignin();
  const navigate = useNavigate();

  return (
    <Page testId="page-signin">
      <div className="container mx-auto min-h-[50vh]">
        <div className="my-6">
          <div className="mb-4 border-b border-neutral-500/50 pb-2 text-4xl">Sign In</div>
          <Formik<SigninFormValues>
            initialValues={{ username: '', password: '' }}
            validationSchema={validationSchema}
            onSubmit={(values, { setSubmitting }) => {
              signin(values.username, {
                onSuccess: () => {
                  setSubmitting(false);
                  navigate('/');
                },
              });
            }}
          >
            {({ dirty, isSubmitting }) => (
              <Form data-testid="signin-form">
                <TextField
                  name="username"
                  label="Username"
                  className="mb-4 lg:w-2/3 xl:w-1/2"
                  autoComplete="off"
                  maxLength={30}
                  disabled={isSubmitting}
                  tabIndex={1}
                  testId="text-field-username"
                />
                <TextField
                  type="password"
                  name="password"
                  label="Password"
                  className="mb-4 lg:w-2/3 xl:w-1/2"
                  autoComplete="off"
                  maxLength={30}
                  disabled={isSubmitting}
                  tabIndex={2}
                  testId="text-field-password"
                />
                <Button
                  type="submit"
                  className="w-full sm:w-40"
                  disabled={isSubmitting || !dirty}
                  tabIndex={3}
                  testId="signin-form-button-submit"
                >
                  Sign In
                </Button>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </Page>
  );
};

export default SigninPage;
