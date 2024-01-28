import { render } from '@testing-library/react';
import NotFound from './index';

describe('NotFound Component', () => {
  it('renders correct UI', () => {
    const { getByText } = render(<NotFound />);

    // Check if the 404 text is present
    expect(getByText('404')).toBeInTheDocument();
    expect(getByText("Sorry, we couldn't find this page.")).toBeInTheDocument();
  });

  it('renders the "Back to homepage" link', () => {
    const { getByText } = render(<NotFound />);

    // Check if the "Back to homepage" link is present
    const homepageLink = getByText('Back to homepage');
    expect(homepageLink).toBeInTheDocument();

    // Check if the link has the correct href attribute
    expect(homepageLink).toHaveAttribute('href', '/');
  });
});
