import { PropsWithTestId } from '@leanstacks/react-common';
import { PropsWithChildren } from 'react';

/**
 * Properties for the `SettingsHeading` component.
 * @see {@link PropsWithChildren}
 * @see {@link PropsWithTestId}
 */
interface SettingsHeadingProps extends PropsWithChildren, PropsWithTestId {}

/**
 * The `SettingsHeading` component renders a standardized page/section
 * heading for Settings pages.
 * @param {SettingsHeadingProps} props - Component properties, `SettingsHeadingProps`.
 * @returns {JSX.Element} JSX
 */
const SettingsHeading = ({
  children,
  testId = 'settings-heading',
}: SettingsHeadingProps): JSX.Element => {
  return (
    <div className="mb-4 border-b border-neutral-500/50 pb-2 text-4xl" data-testid={testId}>
      {children}
    </div>
  );
};

export default SettingsHeading;
