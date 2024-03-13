import { PropsWithTestId } from '@leanstacks/react-common';
import { Form, Formik } from 'formik';
import { object, string } from 'yup';

import { User } from 'api/useGetUser';
import { useGetCurrentUser } from 'api/useGetCurrentUser';
import { useUpdateUser } from '../api/useUpdateUser';
import { useToasts } from 'providers/ToastsProvider';

import SettingsHeading from './SettingsHeading';
import LoaderSpinner from 'components/Loader/LoaderSpinner';
import TextField from 'components/Form/TextField';
import Button from 'components/Button/Button';

/**
 * Properties for the `ProfileSettings` component.
 * @see {@link PropsWithTestId}
 */
interface ProfileSettingsProps extends PropsWithTestId {}

/**
 * The form values.
 */
interface ProfileSettingsFormValues extends Pick<User, 'name' | 'username' | 'email'> {}

/**
 * The form validation schema.
 */
const profileSettingsSchema = object({
  name: string().required('Required. '),
  username: string()
    .matches(/^[\w- ]+$/, 'May only contain letters, numbers, dashes, and underscores. ')
    .required('Required. '),
  email: string().email('Must be email address, e.g. user@domain.com ').required('Required. '),
});

/**
 * The `ProfileSettings` React component renders a form for updating user
 * profile attributes.
 * @param {ProfileSettingsProps} props - Component properties, `ProfileSettingsProps`.
 * @returns {JSX.Element} JSX
 */
const ProfileSettings = ({ testId = 'settings-profile' }: ProfileSettingsProps): JSX.Element => {
  const { data: user } = useGetCurrentUser({ enabled: true });
  const { mutate: updateUser } = useUpdateUser();
  const { createToast } = useToasts();

  return (
    <div data-testid={testId}>
      <SettingsHeading testId={`${testId}-settings-heading`}>Profile</SettingsHeading>

      {user && (
        <Formik<ProfileSettingsFormValues>
          enableReinitialize={true}
          initialValues={{
            name: user.name,
            username: user.username,
            email: user.email,
          }}
          validationSchema={profileSettingsSchema}
          onSubmit={(values, { setSubmitting }) => {
            updateUser(
              { ...user, ...values },
              {
                onSuccess: () => {
                  createToast({ text: 'Profile updated.', isAutoDismiss: true });
                  setSubmitting(false);
                },
              },
            );
          }}
        >
          {({ dirty, isSubmitting }) => (
            <Form data-testid={`${testId}-form`}>
              <TextField
                name="name"
                label="Name"
                className="mb-4 lg:w-2/3 xl:w-1/2"
                autoComplete="off"
                disabled={isSubmitting}
                tabIndex={1}
                testId={`${testId}-text-field-name`}
              />

              <TextField
                name="username"
                label="User name"
                className="mb-4 lg:w-2/3 xl:w-1/2"
                supportingText="Displayed in various places where your user is mentioned."
                autoComplete="off"
                disabled={isSubmitting}
                tabIndex={2}
                testId={`${testId}-text-field-username`}
              />

              <TextField
                name="email"
                label="Email"
                className="mb-4 lg:w-2/3 xl:w-1/2"
                autoComplete="off"
                disabled={isSubmitting}
                tabIndex={3}
                testId={`${testId}-text-field-email`}
              />

              <Button
                type="submit"
                className="w-full !border-green-600 !bg-green-600 sm:w-40"
                disabled={isSubmitting || !dirty}
                tabIndex={100}
                testId={`${testId}-button-submit`}
              >
                Update Profile
              </Button>
            </Form>
          )}
        </Formik>
      )}

      {!user && <LoaderSpinner testId={`${testId}-loader`} />}
    </div>
  );
};

export default ProfileSettings;
