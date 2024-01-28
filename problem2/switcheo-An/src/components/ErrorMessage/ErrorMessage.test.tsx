import { render } from '@testing-library/react';
import ErrorMessage from './index';

describe('ErrorMessage Component', () => {
  it('renders error message correctly', () => {
    const { getByText } = render(
      <ErrorMessage message="This is an error message" />
    );

    expect(getByText('Error!!!')).toBeInTheDocument();
    expect(getByText('This is an error message')).toBeInTheDocument();
  });

  it('applies custom className when provided', () => {
    const { container } = render(
      <ErrorMessage message="Custom error message" className="custom-class" />
    );

    expect(container.firstChild).toHaveClass('custom-class');
  });
});
