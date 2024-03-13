import Page from 'components/Page/Page';
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
          <Text variant="heading2">Heading 2</Text>
          <Text variant="heading3">Heading 3</Text>
        </section>

        <section className="my-24">
          <Text variant="heading2" className="mb-4">
            Text Components
          </Text>

          <Text variant="heading1">Heading 1</Text>
          <Text variant="heading2">Heading 2</Text>
          <Text variant="heading3">Heading 3</Text>
        </section>
      </div>
    </Page>
  );
};

export default ComponentsPage;
