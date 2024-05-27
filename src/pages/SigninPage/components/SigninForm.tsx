import { PropsWithTestId } from '@leanstacks/react-common';
import { Form, Formik } from 'formik';
import { object, string } from 'yup';
import { useNavigate } from 'react-router-dom';
import { Button } from '@leanstacks/react-common';

import { useSignin } from '../api/useSignin';
import TextField from 'components/Form/TextField';

/**
 * Properties for the `SigninForm` component.
 * @see {@link PropsWithTestId}
 */
interface SigninFormProps extends PropsWithTestId {}

/**
 * Signin form values.
 */
interface SigninFormValues {
  username: string;
  password: string;
}

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
 * The `SigninForm` component renders a form for user authentication.
 *
 * Upon successful authentication, navigates the user to the authenticated
 * landing page of the application.
 *
 * Upon error, displays messages.
 *
 * @param {SigninFormProps} props - Component properties.
 * @returns {JSX.Element} JSX
 */
const SigninForm = ({ testId = 'form-signin' }: SigninFormProps): JSX.Element => {
  const { mutate: signin } = useSignin();
  const navigate = useNavigate();

  return (
    <div data-testid={testId}>
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
          <Form data-testid={`${testId}-form`}>
            <TextField
              name="username"
              label="Username"
              className="mb-4 lg:w-2/3 xl:w-1/2"
              autoComplete="off"
              maxLength={30}
              disabled={isSubmitting}
              tabIndex={1}
              testId={`${testId}-text-field-username`}
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
              testId={`${testId}-text-field-password`}
            />
            <Button
              type="submit"
              className="w-full sm:w-40"
              disabled={isSubmitting || !dirty}
              tabIndex={3}
              testId={`${testId}-button-submit`}
            >
              Sign In
            </Button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default SigninForm;
