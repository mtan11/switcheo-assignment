import { render } from '@testing-library/react';
import Footer from './index';

describe('Footer Component', () => {
  it('renders copyright information correctly', () => {
    const { getByText } = render(<Footer />);

    // Assert
    expect(
      getByText('Copyright © 2023. All Rights Reserved By')
    ).toBeInTheDocument();
    expect(getByText('Switcheo')).toBeInTheDocument();
  });
});
