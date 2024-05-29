import { ReactNode, useState } from 'react';
import { PropsWithClassName, PropsWithTestId } from '@leanstacks/react-common';
import classNames from 'classnames';

/**
 * Properties for the `Dropdown` component.
 * @param {ReactNode} toggle - The content which toggles display of the dropdown content.
 * @param {ReactNode} content - The dropdown content.
 * @see {@link PropsWithClassName}
 * @see {@link PropsWithTestId}
 */
interface DropdownProps extends PropsWithClassName, PropsWithTestId {
  toggle: ReactNode;
  content: ReactNode;
}

/**
 * The `Dropdown` component controls the display of content which "drops down"
 * from the trigger.
 * 
 * Any `ReactNode` may be used for the `toggle` and the `content`; however, 
 * you may use the `DropdownContent` and `DropdownItem` components to simplify
 * creation of a dropdown component content.
 * 
 * *Example:*
 * ```jsx
  <Dropdown
    toggle={<Icon name="language" className="px-2 py-1" />}
    content={
      <DropdownContent className="text-sm">
        <DropdownItem onClick={() => setLanguage('en')} testId="dropdown-item-en">
          English
        </DropdownItem>
        <DropdownItem onClick={() => setLanguage('fr')} testId="dropdown-item-fr">
          French
        </DropdownItem>
        <DropdownItem onClick={() => setLanguage('es')} testId="dropdown-item-es">
          Spanish
        </DropdownItem>
      </DropdownContent>
    }
    className={className}
    testId="dropdown-language"
  />
 * ```
 * @param {DropdownProps} props - Component properties.
 * @returns {JSX.Element} JSX
 */
const Dropdown = ({
  className,
  content,
  testId = 'dropdown',
  toggle,
}: DropdownProps): JSX.Element => {
  const [hidden, setHidden] = useState<boolean>(true);

  return (
    <div className={className} data-testid={testId}>
      <div
        className={classNames('absolute left-0 top-0 z-[1000] h-screen w-screen', {
          hidden: hidden,
        })}
        onClick={() => setHidden(true)}
        data-testid={`${testId}-backdrop`}
      ></div>
      <div className="relative">
        <div
          className="cursor-pointer"
          onClick={() => setHidden(!hidden)}
          data-testid={`${testId}-toggle`}
        >
          {toggle}
        </div>
        <div
          className={classNames('absolute right-0 z-[1001]', {
            hidden: hidden,
          })}
          onClick={() => setHidden(true)}
          data-testid={`${testId}-content`}
        >
          {content}
        </div>
      </div>
    </div>
  );
};

export default Dropdown;
