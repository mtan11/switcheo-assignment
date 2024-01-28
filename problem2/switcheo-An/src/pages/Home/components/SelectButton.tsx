import { FC } from 'react';
import ChevronDownIcon from '@switcheo/assets/icons/chevron-down-icon.svg?react';

export interface SelectButtonProps {
  onClick: () => void;
  iconURL: string;
  title: string;
}

const SelectButton: FC<SelectButtonProps> = ({ onClick, title, iconURL }) => {
  return (
    <button
      onClick={onClick}
      className="mb-2 flex items-center justify-between gap-2"
    >
      {iconURL && (
        <img className="h-10" src={iconURL} alt={`Logo Icon ${title}`} />
      )}
      <div className="text-base font-semibold">{title || 'Select Token'}</div>
      <ChevronDownIcon />
    </button>
  );
};

export default SelectButton;
