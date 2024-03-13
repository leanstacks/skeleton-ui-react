import { useNavigate } from 'react-router-dom';
import { PropsWithTestId } from '@leanstacks/react-common';
import { Form, Formik } from 'formik';
import { object, string } from 'yup';

import { User } from 'api/useGetUser';
import { useSignIn } from '../api/useSignIn';
import { useToasts } from 'providers/ToastsProvider';

import TextField from 'components/Form/TextField';
import Button from 'components/Button/Button';
import { useState } from 'react';

/**
 * Properties for the `SignInForm` component.
 * @see {@link PropsWithTestId}
 */
interface SignInFormProps extends PropsWithTestId {}

/**
 * The form values.
 */
interface SignInFormValues extends Pick<User, 'email'> {}

/**
 * The form validation schema.
 */
const signInSchema = object({
  email: string().email('Provide a valid email address.').required('Required. '),
});

/**
 * The `SignInForm` React component renders a form for authentication.
 * @param {SignInFormProps} props - Component properties.
 * @returns {JSX.Element} JSX
 */
const SignInForm = ({ testId = 'form-signin' }: SignInFormProps): JSX.Element => {
  const [errorMessage, setErrorMessage] = useState<string>();
  const { mutate: signIn } = useSignIn();
  const navigate = useNavigate();
  const { createToast } = useToasts();

  return (
    <div data-testid={testId}>
      <div className="mb-4 border-b border-neutral-500/50 pb-2 text-4xl">Sign In</div>

      <Formik<SignInFormValues>
        enableReinitialize={true}
        initialValues={{
          email: '',
        }}
        validationSchema={signInSchema}
        onSubmit={(values, { setSubmitting }) => {
          signIn(values.email, {
            onSuccess: (data) => {
              createToast({ text: `Welcome back ${data.name}!`, isAutoDismiss: true });
              setSubmitting(false);
              navigate('/app', { replace: true });
            },
            onError: (error) => {
              setErrorMessage(error.message);
              setSubmitting(false);
            },
          });
        }}
      >
        {({ dirty, isSubmitting }) => (
          <Form data-testid={`${testId}-form`}>
            {errorMessage && (
              <div className="my-4 text-red-600" data-testid={`${testId}-error`}>
                {errorMessage}
              </div>
            )}

            <TextField
              name="email"
              label="Email"
              className="mb-4 lg:w-2/3 xl:w-1/2"
              autoComplete="off"
              disabled={isSubmitting}
              tabIndex={1}
              testId={`${testId}-text-field-email`}
            />

            <Button
              type="submit"
              className="w-full !border-green-600 !bg-green-600 sm:w-40"
              disabled={isSubmitting || !dirty}
              tabIndex={100}
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

export default SignInForm;
