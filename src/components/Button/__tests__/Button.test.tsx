import { render, screen } from 'test/test-utils';
import Button from '../Button';

describe('Button', () => {
  it('should render successfully', async () => {
    // ARRANGE
    render(<Button />);
    await screen.findByTestId('button');

    // ASSERT
    expect(screen.getByTestId('button')).toBeDefined();
  });
});
