import { FC, memo, useEffect, useState } from 'react';
import { Modal } from '@switcheo/components';
import { TokenPrice } from '@switcheo/types';
import { getIconByName } from '@switcheo/utils/helper';
import NotFoundImage from '@switcheo/assets/images/no-image.png';
import RightArrowIcon from '@switcheo/assets/icons/right-arrow-icon.svg?react';

export interface SelectTokenModalProps {
  isModalOpen: boolean;
  closeModal: () => void;
  onSelect: (token: TokenPrice) => void;
  listPrices: TokenPrice[];
}

const SelectTokenModal: FC<SelectTokenModalProps> = memo(
  ({ isModalOpen, closeModal, onSelect, listPrices }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredItems, setFilteredItems] =
      useState<TokenPrice[]>(listPrices);

    useEffect(() => {
      const filtered = listPrices.filter((item) =>
        item.currency.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredItems(filtered);
    }, [searchTerm]);

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setSearchTerm(e.target.value);
    };

    const handleOnSelect = (token: TokenPrice) => {
      handleCloseModal();
      onSelect(token);
    };

    const handleCloseModal = () => {
      setSearchTerm('');
      closeModal();
    };

    return (
      <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
        <div className="mb-4 border-b border-solid border-gray-300 pb-4">
          <h2 className="text-lg font-semibold md:text-xl">Select a Token</h2>
        </div>
        <input
          data-testid="searchInput"
          onChange={handleSearchChange}
          className="mb-4 h-12 w-full rounded-xl bg-input-text px-4"
          placeholder="Search name"
        />
        <p className="mb-4 text-sm">Common tokens</p>
        <div className="flex h-[390px] flex-col gap-2 overflow-auto md:gap-4">
          {filteredItems.map((price) => {
            return (
              <div
                key={price.currency}
                onClick={() => handleOnSelect(price)}
                className="flex cursor-pointer items-center justify-between px-2 hover:bg-gray-400/30"
              >
                <div className="flex items-center gap-2 py-2">
                  <img
                    src={getIconByName(price.currency)}
                    className="h-9"
                    alt="Token logo"
                    onError={(e) => {
                      e.currentTarget.src = NotFoundImage;
                    }}
                  />
                  <h4>{price.currency}</h4>
                </div>
                <RightArrowIcon />
              </div>
            );
          })}
          {filteredItems.length === 0 && (
            <div className="text-center">Not found</div>
          )}
        </div>
      </Modal>
    );
  }
);

export default SelectTokenModal;
