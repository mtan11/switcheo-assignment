import { ChangeEvent, FC } from 'react';
import { formattedNumber } from '@switcheo/utils/helper';

export interface TokenInputProps {
  value: number;
  onChange: (value: number) => void;
  rate: number;
}
const TokenInput: FC<TokenInputProps> = ({ value, onChange, rate }) => {
  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const inputValue = parseFloat(event.target.value);
    if (!isNaN(inputValue)) {
      onChange(inputValue);
    } else {
      onChange(0);
    }
  };
  return (
    <div className="rounded-lg bg-input-text px-4 py-6">
      <input
        onChange={handleInputChange}
        className="mb-2 w-full bg-transparent"
        value={value}
      />
      <div className="overflow-hidden text-ellipsis whitespace-nowrap text-xs text-gray-600">
        ~{formattedNumber(value * rate)}
      </div>
    </div>
  );
};

export default TokenInput;
