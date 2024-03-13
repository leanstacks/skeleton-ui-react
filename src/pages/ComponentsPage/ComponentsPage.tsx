import { ButtonVariant } from '@leanstacks/react-common';
import Button from 'components/Button/Button';
import Page from 'components/Page/Page';
import CodeBlock from 'components/Text/CodeBlock';
import Text from 'components/Text/Text';

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
          <CodeBlock
            code='<Text variant="heading1">Heading 1</Text>'
            language="jsx"
            className="my-4"
          />

          <Text variant="heading2">Heading 2</Text>
          <CodeBlock
            code='<Text variant="heading2">Heading 2</Text>'
            language="jsx"
            className="my-4"
          />

          <Text variant="heading3">Heading 3</Text>
          <CodeBlock
            code='<Text variant="heading3">Heading 3</Text>'
            language="jsx"
            className="my-4"
          />
        </section>

        <section className="my-24">
          <Text variant="heading2" className="mb-4">
            Button Components
          </Text>

          <Button>Default button</Button>
          <CodeBlock code="<Button>Default button</Button>" language="jsx" className="my-4" />

          <Button variant={ButtonVariant.Outline}>Outline button</Button>
          <CodeBlock
            code="<Button variant={ButtonVariant.Outline}>Outline button</Button>"
            language="jsx"
            className="my-4"
          />

          <Button variant={ButtonVariant.Solid}>Solid button</Button>
          <CodeBlock
            code="<Button variant={ButtonVariant.Outline}>Outline button</Button>"
            language="jsx"
            className="my-4"
          />

          <Button variant={ButtonVariant.Text}>Text button</Button>
          <CodeBlock
            code="<Button variant={ButtonVariant.Text}>Text button</Button>"
            language="jsx"
            className="my-4"
          />
        </section>
      </div>
    </Page>
  );
};

export default ComponentsPage;
