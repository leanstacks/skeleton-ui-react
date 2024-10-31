import { PropsWithClassName, PropsWithTestId } from '@leanstacks/react-common';
import classNames from 'classnames';

/**
 * Properties for the `Avatar` component.
 * @param {string} [picture] - Optional. An image source. When present, this is used
 * as the Avatar image.
 * @param {string} value - The value, e.g. a name, title, etc.
 */
interface AvatarProps extends PropsWithClassName, PropsWithTestId {
  picture?: string;
  value: string;
}

/**
 * List of possible background colors for generated Avatars.
 */
const BACKGROUND_COLORS = [
  'bg-red-600',
  'bg-orange-600',
  'bg-amber-600',
  'bg-yellow-600',
  'bg-lime-600',
  'bg-green-600',
  'bg-emerald-600',
  'bg-teal-600',
  'bg-cyan-600',
  'bg-sky-600',
  'bg-blue-600',
  'bg-indigo-600',
  'bg-violet-600',
  'bg-purple-600',
  'bg-fuchsia-600',
  'bg-pink-600',
  'bg-rose-600',
];

/**
 * The `Avatar` React component renders an icon which uniquely represents a person or
 * thing (e.g. team, group, etc.).
 *
 * When `picture` is supplied, it will always be used. The `picture` will be used as the `img`
 * source and, therefore, may be a URL or a Base64 encoded value.
 *
 * When `picture` is undefined, the `value` attribute is used to render an `Avatar`.
 *
 * *Example:*
 * ```
 * <Avatar
 *   picture='https://example.com/pic.png'
 *   value='Roberto'
 *   className='rounded-full'
 *   testId='icon-avatar-profile' />
 * ```
 * @param {AvatarProps} props - Component properties, `AvatarProps`.
 * @returns {JSX.Element} JSX
 */
const Avatar = ({
  className,
  picture,
  testId = 'icon-avatar',
  value,
}: AvatarProps): JSX.Element => {
  if (picture) {
    // 'picture' is available
    return (
      <img
        src={picture}
        alt={value}
        title={value}
        referrerPolicy="no-referrer"
        className={classNames('size-8', className)}
        data-testid={testId}
      />
    );
  }

  // 'picture' NOT available
  const trimmedValue = value.trim();
  const initial = trimmedValue ? trimmedValue.charAt(0) : '?';
  const backgroundColor = BACKGROUND_COLORS[trimmedValue.length % BACKGROUND_COLORS.length];
  return (
    <div
      className={classNames(
        'flex size-8 items-center justify-center font-bold text-neutral-100',
        backgroundColor,
        className,
      )}
      title={value}
      data-testid={testId}
    >
      {initial}
    </div>
  );
};

export default Avatar;
