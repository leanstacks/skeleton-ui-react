import { render, screen } from 'test/test-utils';
import Button from '../Button';

describe('Button', () => {
  it('should render successfully', async () => {
    render(<Button />);

    await screen.findByTestId('button');

    expect(screen.getByTestId('button')).toBeDefined();
  });
});
