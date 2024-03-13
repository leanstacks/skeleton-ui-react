import { PropsWithTestId } from '@leanstacks/react-common';
import classNames from 'classnames';

import { useSettings } from 'providers/SettingsProvider';
import { useSetSettings } from 'api/useSetSettings';
import SettingsHeading from './SettingsHeading';

/**
 * Properties for the `AppearanceSettings` component.
 * @see {@link PropsWithTestId}
 */
interface AppearanceSettingsProps extends PropsWithTestId {}

/**
 * The `AppearanceSettings` React component renders a set of controls to
 * allow users to update personal configuration related to how the application
 * appears.
 * @param {AppearanceSettingsProps} props - Component properties, `AppearanceSettingsProps`.
 * @returns {JSX.Element} JSX
 */
const AppearanceSettings = ({
  testId = 'settings-appearance',
}: AppearanceSettingsProps): JSX.Element => {
  const settings = useSettings();
  const { mutate: setSettings } = useSetSettings();

  return (
    <div data-testid={testId}>
      <SettingsHeading testId={`${testId}-settings-heading`}>Theme</SettingsHeading>

      <div className="my-4 text-sm">Choose how the application looks to you.</div>

      <div className="flex flex-wrap gap-8">
        <div
          className={classNames(
            'flex w-48 flex-col overflow-clip rounded-lg border',
            { 'border-slate-500/25': settings.theme !== 'light' },
            { 'border-blue-600': settings.theme === 'light' },
          )}
          role="button"
          onClick={() => setSettings({ theme: 'light' })}
          data-testid={`${testId}-theme-light`}
        >
          <div className="flex h-24 flex-col border-b border-slate-500/25 bg-white">
            <div className="h-3 w-full border-b border-b-neutral-500/30 bg-neutral-100"></div>
            <div className="ms-4 mt-1 h-3 w-1/3 rounded bg-neutral-300"></div>
            <div className="ms-4 mt-0.5 h-3 w-1/3 rounded bg-neutral-300"></div>
            <div className="ms-4 mt-0.5 h-3 w-1/3 rounded bg-neutral-300"></div>
            <div className="ms-4 mt-1 flex">
              <div className="h-2 w-4 rounded border border-neutral-300"></div>
              <div className="ms-1 h-2 w-4 rounded bg-blue-600"></div>
            </div>
          </div>
          <div className="flex h-12 items-center justify-center font-bold">Light</div>
        </div>

        <div
          className={classNames(
            'flex w-48 flex-col overflow-clip rounded-lg border',
            { 'border-slate-500/25': settings.theme !== 'dark' },
            { 'border-blue-600': settings.theme === 'dark' },
          )}
          role="button"
          onClick={() => setSettings({ theme: 'dark' })}
          data-testid={`${testId}-theme-dark`}
        >
          <div className="flex h-24 flex-col border-b border-slate-500/25 bg-neutral-800">
            <div className="h-3 w-full border-b border-b-neutral-500/50 bg-neutral-900"></div>
            <div className="ms-4 mt-1 h-3 w-1/3 rounded bg-neutral-700"></div>
            <div className="ms-4 mt-0.5 h-3 w-1/3 rounded bg-neutral-700"></div>
            <div className="ms-4 mt-0.5 h-3 w-1/3 rounded bg-neutral-700"></div>
            <div className="ms-4 mt-1 flex">
              <div className="h-2 w-4 rounded border border-neutral-500"></div>
              <div className="ms-1 h-2 w-4 rounded bg-blue-600"></div>
            </div>
          </div>
          <div className="flex h-12 items-center justify-center font-bold">Dark</div>
        </div>
      </div>
    </div>
  );
};

export default AppearanceSettings;
