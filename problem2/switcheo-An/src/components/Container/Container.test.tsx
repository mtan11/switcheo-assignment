import { render } from '@testing-library/react';
import Container from './index';

describe('Container Component', () => {
  it('renders children correctly', () => {
    const { getByText } = render(
      <Container>
        <div>Child Component</div>
      </Container>
    );
    expect(getByText('Child Component')).toBeInTheDocument();
  });

  it('applies custom className when provided', () => {
    const { container } = render(
      <Container className="custom-class">
        <div>Child Component</div>
      </Container>
    );

    expect(container.firstChild).toHaveClass('custom-class');
  });
});
