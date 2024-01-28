import classNames from 'classnames';
import { FC, useState } from 'react';
import ArrowDownIcon from '@switcheo/assets/icons/arrow-down-icon.svg?react';
import ExchangeArrowIcon from '@switcheo/assets/icons/exchange-arrow-icon.svg?react';

export interface SwapButtonProps {
  onClick: () => void;
}

const SwapButton: FC<SwapButtonProps> = ({ onClick }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <button
      onClick={onClick}
      className={classNames([
        'flex h-10 w-10 items-center justify-center rounded-full',
        isHovered ? 'bg-teal-500 text-white' : 'bg-input-text text-teal-500',
      ])}
      onMouseOver={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {isHovered ? (
        <ExchangeArrowIcon data-testid="exchangeArrowIcon" />
      ) : (
        <ArrowDownIcon data-testid="arrowDownIcon" />
      )}
    </button>
  );
};

export default SwapButton;
