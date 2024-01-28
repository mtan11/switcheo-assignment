import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import SelectButton, { SelectButtonProps } from '../SelectButton';

describe('SelectButton', () => {
  const defaultProps: SelectButtonProps = {
    onClick: jest.fn(),
    title: 'Token',
    iconURL: 'fake-icon-url',
  };

  it('renders with provided title and icon', () => {
    const { getByText, getByAltText } = render(
      <SelectButton {...defaultProps} />
    );

    const titleElement = getByText('Token');
    const iconElement = getByAltText('Logo Icon Token');

    expect(titleElement).toBeInTheDocument();
    expect(iconElement).toHaveAttribute('src', 'fake-icon-url');
  });

  it('renders with default title if no title provided', () => {
    const { getByText } = render(<SelectButton {...defaultProps} title="" />);

    const titleElement = getByText('Select Token');
    expect(titleElement).toBeInTheDocument();
  });

  it('calls onClick when the button is clicked', () => {
    const { getByText } = render(<SelectButton {...defaultProps} />);

    const button = getByText('Token');
    fireEvent.click(button);

    expect(defaultProps.onClick).toHaveBeenCalledTimes(1);
  });
});
