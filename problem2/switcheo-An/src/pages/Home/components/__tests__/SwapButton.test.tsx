import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import SwapButton, { SwapButtonProps } from '../SwapButton';

describe('SwapButton', () => {
  const defaultProps: SwapButtonProps = {
    onClick: jest.fn(),
  };

  it('renders with default state', () => {
    const { getByTestId, queryByTestId } = render(
      <SwapButton {...defaultProps} />
    );

    const arrowDownIcon = getByTestId('arrowDownIcon');
    const exchangeArrowIcon = queryByTestId('exchangeArrowIcon');

    expect(arrowDownIcon).toBeInTheDocument();
    expect(exchangeArrowIcon).not.toBeInTheDocument();
  });

  it('calls onClick when the button is clicked', () => {
    const { getByTestId } = render(<SwapButton {...defaultProps} />);

    const button = getByTestId('arrowDownIcon');

    fireEvent.click(button);

    expect(defaultProps.onClick).toHaveBeenCalledTimes(1);
  });
});
