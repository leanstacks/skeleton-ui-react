import { ButtonVariant } from '@leanstacks/react-common';

import Button from 'components/Button/Button';
import Page from 'components/Page/Page';
import CodeSnippet from 'components/Text/CodeSnippet';
import Text from 'components/Text/Text';

/**
 * The `ComponentsPage` component renders the layout for the components page.
 * It provides an `Outlet` for displaying a variety of sub-pages containing
 * React component variations.
 * @returns {JSX.Element} JSX
 */
const ComponentsPage = (): JSX.Element => {
  return (
    <Page testId="page-components">
      <div className="container mx-auto my-4 min-h-[50vh]">
        <Text variant="heading1" className="mb-4 border-b border-neutral-500/50 pb-2">
          Components
        </Text>

        <section className="mb-24 mt-8">
          <Text variant="heading2" className="mb-4">
            Text Components
          </Text>
          <Text variant="heading1">Heading 1</Text>
          <CodeSnippet className="my-2" code={`<Text variant="heading1">Heading 1</Text>`} />

          <Text variant="heading2">Heading 2</Text>
          <CodeSnippet className="my-2" code={`<Text variant="heading2">Heading 2</Text>`} />

          <Text variant="heading3">Heading 3</Text>
          <CodeSnippet className="my-2" code={`<Text variant="heading3">Heading 3</Text>`} />
        </section>

        <section className="my-24">
          <Text variant="heading2" className="mb-4">
            Button Components
          </Text>

          <div className="my-8">
            <Button>Default button</Button>
            <CodeSnippet className="my-2" code={`<Button>Default button</Button>`} />
          </div>

          <div className="my-8">
            <Button variant={ButtonVariant.Outline}>Outline button</Button>
            <CodeSnippet
              className="my-2"
              code={`<Button variant={ButtonVariant.Outline}>Outline button</Button>`}
            />
          </div>

          <div className="my-8">
            <Button variant={ButtonVariant.Solid}>Solid button</Button>
            <CodeSnippet
              className="my-2"
              code={`<Button variant={ButtonVariant.Solid}>Solid button</Button>`}
            />
          </div>

          <div className="my-8">
            <Button variant={ButtonVariant.Text}>Text button</Button>
            <CodeSnippet
              className="my-2"
              code={`<Button variant={ButtonVariant.Text}>Text button</Button>`}
            />
          </div>
        </section>
      </div>
    </Page>
  );
};

export default ComponentsPage;
