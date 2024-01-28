import { fireEvent, render } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import Header from './index';

describe('Header Component', () => {
  it('renders logo and navigation links correctly', () => {
    const { getByTestId, getByText } = render(
      <Router>
        <Header />
      </Router>
    );

    // Assuming that the alt attribute is "logo" and the title attribute is "Switcheo"
    expect(getByTestId('logo')).toBeInTheDocument();

    expect(getByText('Home')).toBeInTheDocument();
  });

  it('navigates to Home page when Home link is clicked', () => {
    const { getByText } = render(
      <Router>
        <Header />
      </Router>
    );

    const homeLink = getByText('Home');
    fireEvent.click(homeLink);

    // Assuming that the Home route is represented by '/'
    expect(window.location.pathname).toBe('/');
  });
});
