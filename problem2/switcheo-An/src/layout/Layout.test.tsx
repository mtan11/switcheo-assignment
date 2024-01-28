import { render } from '@testing-library/react';
import Layout from './index';
import { BrowserRouter } from 'react-router-dom';

describe('Layout Component', () => {
  it('renders the Header and Footer components', () => {
    const { container, getByText } = render(
      <BrowserRouter>
        <Layout>Hello World</Layout>
      </BrowserRouter>
    );

    // Check if Header component is rendered
    const headerComponent = container.querySelector('header');
    expect(headerComponent).toBeInTheDocument();

    // Check if Footer component is rendered
    const footerComponent = container.querySelector('footer');
    expect(footerComponent).toBeInTheDocument();

    expect(getByText('Hello World')).toBeInTheDocument();
  });
});
