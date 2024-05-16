import { PropsWithClassName, PropsWithTestId } from '@leanstacks/react-common';
import { createColumnHelper } from '@tanstack/react-table';

import avatarPicture from './avatar-picture.png';
import { ComponentProperty } from '../model/components';
import Text from 'components/Text/Text';
import Table from 'components/Table/Table';
import CodeSnippet from 'components/Text/CodeSnippet';
import Avatar from 'components/Icon/Avatar';

/**
 * Properties for the `AvatarComponents` React component.
 * @see {@link PropsWithClassName}
 * @see {@link PropsWithTestId}
 */
interface AvatarComponentsProps extends PropsWithClassName, PropsWithTestId {}

/**
 * The `AvatarComponents` React component renders a set of examples illustrating
 * the use of the `Avatar` component.
 * @param {AvatarComponentsProps} props - Component properties.
 * @returns {JSX.Element} JSX
 */
const AvatarComponents = ({
  className,
  testId = 'components-avatar',
}: AvatarComponentsProps): JSX.Element => {
  const data: ComponentProperty[] = [
    {
      name: 'className',
      description: 'Optional. Additional CSS class names.',
    },
    {
      name: 'picture',
      description: 'The URL or base64 encoded image source.',
    },
    {
      name: 'testId',
      description: 'Optional. Identifier for testing.',
    },
    {
      name: 'value',
      description:
        'The short name to associate with the Avatar. Displayed as alternative text for the image or when hovered.',
    },
  ];
  const columnHelper = createColumnHelper<ComponentProperty>();
  const columns = [
    columnHelper.accessor('name', {
      cell: (info) => <span className="font-mono text-sky-600">{info.getValue()}</span>,
      header: () => 'Name',
    }),
    columnHelper.accessor('description', {
      cell: (info) => info.renderValue(),
      header: () => 'Description',
    }),
  ];

  return (
    <section className={className} data-testid={testId}>
      <Text variant="heading2" className="mb-4">
        Avatar Component
      </Text>

      <div className="my-8">
        The <span className="font-mono font-bold">Avatar</span> component displays a circular image
        or placeholder. Usually used to represent a user, group, or team, but may be used to
        represent any named object.
      </div>

      <div className="my-8">
        <Text variant="heading3" className="mb-2">
          Properties
        </Text>
        <Table<ComponentProperty, string> data={data} columns={columns} />
      </div>

      <Text variant="heading3">Examples</Text>
      <div className="my-8">
        <div className="mb-2 flex place-content-center rounded border border-neutral-500/10 p-4 dark:bg-neutral-700/25">
          <Avatar value="John Smith" />
        </div>
        <CodeSnippet className="my-2" code={`<Avatar value="John Smith" />`} />
      </div>

      <div className="my-8">
        <div className="mb-2 flex place-content-center rounded border border-neutral-500/10 p-4 dark:bg-neutral-700/25">
          <Avatar value="Alexander Johnson" className="rounded-full" />
        </div>
        <CodeSnippet
          className="my-2"
          code={`<Avatar value="Alexander Johnson" className="rounded-full" />`}
        />
      </div>

      <div className="my-8">
        <div className="mb-2 flex place-content-center rounded border border-neutral-500/10 p-4 dark:bg-neutral-700/25">
          <Avatar
            picture={avatarPicture}
            value="Jane Jones"
            className="rounded-full"
            testId="my-avatar"
          />
        </div>
        <CodeSnippet
          className="my-2"
          code={`import avatarPicture from './avatar-picture.png';

<Avatar
  picture={avatarPicture}
  value="Jane Jones"
  className="rounded-full"
  testId="my-avatar"
/>`}
        />
      </div>
    </section>
  );
};

export default AvatarComponents;
