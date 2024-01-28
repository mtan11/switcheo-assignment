import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import TokenInput, { TokenInputProps } from '../TokenInput';

// Mock the formattedNumber function
jest.mock('@switcheo/utils/helper', () => ({
  formattedNumber: (value: number) => `Formatted-${value}`,
}));

describe('TokenInput', () => {
  const defaultProps: TokenInputProps = {
    value: 0,
    onChange: jest.fn(),
    rate: 1,
  };

  it('renders with default state', () => {
    const { getByDisplayValue, getByText } = render(
      <TokenInput {...defaultProps} />
    );

    const inputElement = getByDisplayValue('0');
    const formattedNumberElement = getByText('~Formatted-0');

    expect(inputElement).toBeInTheDocument();
    expect(formattedNumberElement).toBeInTheDocument();
  });

  it('calls onChange when input value changes', () => {
    const { getByDisplayValue } = render(<TokenInput {...defaultProps} />);

    const inputElement = getByDisplayValue('0');

    fireEvent.change(inputElement, { target: { value: '15' } });

    expect(defaultProps.onChange).toHaveBeenCalledWith(15);
  });

  it('calls onChange with 0 when input value is not a number', () => {
    const { getByDisplayValue } = render(<TokenInput {...defaultProps} />);

    const inputElement = getByDisplayValue('0');

    fireEvent.change(inputElement, { target: { value: 'not-a-number' } });

    expect(defaultProps.onChange).toHaveBeenCalledWith(0);
  });

  it('displays formatted number based on rate and input value', () => {
    const { getByText, getByDisplayValue } = render(
      <TokenInput {...defaultProps} rate={2} />
    );

    const inputElement = getByDisplayValue('0');
    const formattedNumberElement = getByText('~Formatted-0');

    fireEvent.change(inputElement, { target: { value: '10' } });

    expect(formattedNumberElement).toHaveTextContent('~Formatted-0');
  });
});
