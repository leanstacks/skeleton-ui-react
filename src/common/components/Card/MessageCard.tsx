import classNames from 'classnames';

import Card, { CardProps } from './Card';
import FAIcon, { FAIconProps } from 'common/components/Icon/FAIcon';

/**
 * Properties for the `MessageCard` React component.
 * @param {FAIconProps} [iconProps] - Optional. Icon properties.
 * @param {string} [title] - Optional. A card title.
 * @param {string} message - A card message.
 * @see {@link CardProps}
 */
interface MessageCardProps extends CardProps {
  iconProps?: FAIconProps;
  title?: string;
  message: string;
}

/**
 * The `MessageCard` component renders a `Card` which conveys a brief message.
 * Useful for informational, warning, error messages, or empty state messages.
 * @param {MessageCardProps} props - Component properties.
 * @returns {JSX.Element} JSX
 */
const MessageCard = ({
  className,
  iconProps,
  message,
  testId = 'card-message',
  title,
}: MessageCardProps): JSX.Element => {
  return (
    <Card className={classNames('w-80', className)} testId={testId}>
      <div className="flex flex-col items-center gap-2 text-center">
        {iconProps && <FAIcon {...iconProps} testId={`${testId}-icon`} />}
        {title && (
          <div className="font-bold" data-testid={`${testId}-title`}>
            {title}
          </div>
        )}
        <div data-testid={`${testId}-message`}>{message}</div>
      </div>
    </Card>
  );
};

export default MessageCard;
