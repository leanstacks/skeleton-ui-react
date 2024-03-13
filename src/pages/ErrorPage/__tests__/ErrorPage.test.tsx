import { render, screen } from 'test/test-utils';

import ErrorPage from '../ErrorPage';

describe('ErrorPage', () => {
  it.skip('should render successfully', async () => {
    // render the React element into the DOM
    render(<ErrorPage />);

    // wait before throwing an error if it cannot find an element
    await screen.findByTestId('page-error');

    // assert the element has rendered
    expect(screen.getByTestId('page-error')).toBeDefined();
  });
});
