import { ComponentPropsWithoutRef } from 'react';
import { BaseComponentProps } from '@leanstacks/react-common';
import classNames from 'classnames';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { faEnvelope, faLink, faPhone, faX } from '@fortawesome/free-solid-svg-icons';

/**
 * A union type of all Font Awesome icon names (without the `fa-` prefix)
 * used in the application.
 */
export type FAIconName = 'envelope' | 'link' | 'phone' | 'x';

/**
 * Properties for the `FAIcon` component.
 * @param {FAIconName} icon - The Font Awesome icon name without the `fa-` prefix.
 * @see {@link BaseComponentProps}
 * @see {@link FontAwesomeIcon}
 */
export interface FAIconProps
  extends BaseComponentProps,
    Omit<ComponentPropsWithoutRef<typeof FontAwesomeIcon>, 'icon'> {
  icon: FAIconName;
}

/**
 * A key/value mapping of every icon used in the application.
 */
const icons: Record<FAIconName, IconProp> = {
  envelope: faEnvelope,
  link: faLink,
  phone: faPhone,
  x: faX,
};

/**
 * The `FAIcon` component renders a Font Awesome icon.
 *
 * Note: Wraps the `FontAwesomeIcon` component.
 * @param param0
 * @returns
 */
const FAIcon = ({
  className,
  icon,
  testId = 'fa-icon',
  ...iconProps
}: FAIconProps): JSX.Element => {
  const faIcon = icons[icon];

  return (
    <FontAwesomeIcon
      className={classNames('fa-icon', className)}
      icon={faIcon}
      {...iconProps}
      data-testid={testId}
    />
  );
};

export default FAIcon;
