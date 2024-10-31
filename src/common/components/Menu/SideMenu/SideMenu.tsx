import { PropsWithChildren, ReactNode } from 'react';
import classNames from 'classnames';
import { animated, useSpring } from '@react-spring/web';
import { PropsWithClassName, PropsWithTestId } from '@leanstacks/react-common';

import { MenuProps } from '../Menu';
import SideMenuHeader from './SideMenuHeader';

/**
 * Properties for the `SideMenu` component.
 * @param {ReactNode} [headerContent] - Optional. A `ReactNode` containing the content
 * of the menu header.
 * @param {'left'|'right'} [string] - Optional. The side of the viewport where the
 * menu should display when shown. Default: `left`.
 * @see {@link MenuProps}
 * @see {@link PropsWithChildren}
 * @see {@link PropsWithClassName}
 * @see {@link PropsWithTestId}
 */
export interface SideMenuProps
  extends MenuProps,
    PropsWithChildren,
    PropsWithClassName,
    PropsWithTestId {
  headerContent?: ReactNode;
  side?: 'left' | 'right';
}

/**
 * The `SideMenu` component renders menu which slides out from the side
 * of the viewport when rendered. The menu content is provided in the
 * `children` attribute. The optional menu header is provided in the
 * `headerContent` attribute.
 * @param {SideMenuProps} props - Component properties, `SideMenuProps`.
 * @returns {JSX.Element} JSX
 */
const SideMenu = ({
  children,
  className,
  close,
  headerContent,
  side = 'left',
  testId = 'menu-side',
}: SideMenuProps): JSX.Element => {
  const isLeft = side === 'left';
  const isRight = side === 'right';

  const springs = useSpring({
    from: { x: isLeft ? -320 : 320 },
    to: { x: 0 },
  });

  return (
    <div
      className={classNames(
        'fixed right-0 top-0 z-[1000] flex h-screen w-screen bg-neutral-500/50',
        { 'flex-row-reverse justify-start': isLeft },
        { 'justify-end': isRight },
        className,
      )}
      data-testid={testId}
    >
      <div className="grow" onClick={() => close?.()} data-testid={`${testId}-backdrop`}></div>
      <animated.div
        style={{ ...springs }}
        className={classNames(
          'z-[1001] h-screen w-80 min-w-48 border-neutral-500 bg-neutral-100 dark:bg-neutral-800',
          { 'rounded-r-lg border-r': isLeft },
          { 'rounded-l-lg border-l': isRight },
        )}
        data-testid={`${testId}-content`}
      >
        <SideMenuHeader close={close} testId={`${testId}-header`}>
          {headerContent}
        </SideMenuHeader>
        <div
          className="flex h-[calc(100vh_-_64px)] flex-col overflow-y-auto"
          data-testid={`${testId}-body`}
        >
          <div className="mx-4" onClick={() => close?.()}>
            {children}
          </div>
        </div>
      </animated.div>
    </div>
  );
};

export default SideMenu;
