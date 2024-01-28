import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import SelectTokenModal, { SelectTokenModalProps } from '../SelectTokenModal';
jest.mock('react-dom', () => ({
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  ...jest.requireActual('react-dom'),
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  createPortal: (node: any) => node,
}));

describe('SelectTokenModal', () => {
  const defaultProps: SelectTokenModalProps = {
    isModalOpen: true,
    closeModal: jest.fn(),
    onSelect: jest.fn(),
    listPrices: [
      {
        currency: 'ETH',
        price: 2000,
        date: new Date('2023-08-29T07:10:50.000Z'),
      },
      {
        currency: 'BTC',
        price: 40000,
        date: new Date('2023-08-29T07:10:50.000Z'),
      },
    ],
  };

  it('renders with default state', () => {
    const { getByPlaceholderText, queryByText } = render(
      <SelectTokenModal {...defaultProps} />
    );

    const searchInput = getByPlaceholderText('Search name');
    const notFoundMessage = queryByText('Not found');

    expect(searchInput).toBeInTheDocument();
    expect(notFoundMessage).not.toBeInTheDocument();
  });

  it('filters and displays tokens based on search term', () => {
    const { getByPlaceholderText, getByText, queryByText } = render(
      <SelectTokenModal {...defaultProps} />
    );

    const searchInput = getByPlaceholderText('Search name');

    fireEvent.change(searchInput, { target: { value: 'ETH' } });

    expect(getByText('ETH')).toBeInTheDocument();
    expect(queryByText('BTC')).not.toBeInTheDocument();
  });

  it('calls onSelect when a token is clicked', () => {
    const { getByText } = render(<SelectTokenModal {...defaultProps} />);

    const ethToken = getByText('ETH');

    fireEvent.click(ethToken);

    expect(defaultProps.onSelect).toHaveBeenCalledWith(
      defaultProps.listPrices[0]
    );
  });

  it('closes the modal and resets search term on close', () => {
    const { getByTestId } = render(<SelectTokenModal {...defaultProps} />);

    const closeButton = getByTestId('closeModalButton');
    const searchInput = getByTestId('searchInput');

    fireEvent.click(closeButton);

    expect(defaultProps.closeModal).toHaveBeenCalledTimes(2);
    expect(searchInput).toHaveValue('');
  });
});
