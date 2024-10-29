import { useState } from 'react';
import classNames from 'classnames';
import { Alert, AlertVariant, PropsWithClassName, PropsWithTestId } from '@leanstacks/react-common';
import { Form, Formik } from 'formik';
import { object, string } from 'yup';
import { useNavigate } from 'react-router-dom';
import { Button } from '@leanstacks/react-common';

import { useSignin } from '../api/useSignin';
import TextField from 'components/Form/TextField';
import FAIcon from 'components/Icon/FAIcon';

/**
 * Properties for the `SigninForm` component.
 * @see {@link PropsWithClassName}
 * @see {@link PropsWithTestId}
 */
interface SigninFormProps extends PropsWithClassName, PropsWithTestId {}

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
const SigninForm = ({ className, testId = 'form-signin' }: SigninFormProps): JSX.Element => {
  const [error, setError] = useState<string>('');
  const { mutate: signin } = useSignin();
  const navigate = useNavigate();

  return (
    <div className={classNames('lg:w-2/3 xl:w-1/2', className)} data-testid={testId}>
      {error && (
        <Alert
          variant={AlertVariant.Error}
          className="mb-4 flex items-center gap-2 rounded-none"
          testId={`${testId}-alert`}
        >
          <FAIcon icon="circleExclamation" size="lg" />
          {error}
        </Alert>
      )}
      <Formik<SigninFormValues>
        initialValues={{ username: '', password: '' }}
        validationSchema={validationSchema}
        onSubmit={(values, { setSubmitting }) => {
          setError('');
          signin(values.username, {
            onSuccess: () => {
              setSubmitting(false);
              navigate('/');
            },
            onError: (err: Error) => {
              setError(err.message);
              setSubmitting(false);
            },
          });
        }}
      >
        {({ dirty, isSubmitting }) => (
          <Form data-testid={`${testId}-form`}>
            <TextField
              name="username"
              label="Username"
              className="mb-4"
              autoComplete="off"
              maxLength={30}
              disabled={isSubmitting}
              testId={`${testId}-text-field-username`}
            />
            <TextField
              type="password"
              name="password"
              label="Password"
              className="mb-4"
              autoComplete="off"
              maxLength={30}
              disabled={isSubmitting}
              testId={`${testId}-text-field-password`}
            />
            <Button
              type="submit"
              className="w-full sm:w-40"
              disabled={isSubmitting || !dirty}
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
