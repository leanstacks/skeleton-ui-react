import { render, screen } from 'test/test-utils';

import Avatar from '../Avatar';

describe('Avatar', () => {
  it('should render successfully', async () => {
    render(<Avatar value="test" />);

    await screen.findByTestId('icon-avatar');

    expect(screen.getByTestId('icon-avatar')).toBeDefined();
  });

  it('should render custom testId', async () => {
    render(<Avatar value="test" testId="custom-testid" />);

    await screen.findByTestId('custom-testid');

    expect(screen.getByTestId('custom-testid')).toBeDefined();
  });

  it('should render custom className', async () => {
    render(<Avatar value="test" className="custom-classname" />);

    await screen.findByTestId('icon-avatar');

    expect(screen.getByTestId('icon-avatar').classList).toContain('custom-classname');
  });

  it('should render picture', async () => {
    const imageSource = 'https://placehold.co/32x32.png';
    render(<Avatar value="test" picture={imageSource} />);

    await screen.findByTestId('icon-avatar');

    expect(screen.getByTestId('icon-avatar').getAttribute('src')).toBe(imageSource);
  });

  it('should render default initial when no value provided', async () => {
    render(<Avatar value=" " />);

    await screen.findByTestId('icon-avatar');

    expect(screen.getByTestId('icon-avatar')).toHaveTextContent('?');
  });
});
