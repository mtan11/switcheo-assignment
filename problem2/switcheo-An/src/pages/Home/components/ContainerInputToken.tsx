import { FC } from 'react';
import { TokenPrice } from '@switcheo/types';
import { Container } from '@switcheo/components';
import { getIconByName } from '@switcheo/utils/helper';
import SelectButton from './SelectButton';
import TokenInput from './TokenInput';

interface ContainerInputTokenProps {
  value: number;
  token?: TokenPrice;
  onSelect: () => void;
  onChange: (value: number) => void;
}

const ContainerInputToken: FC<ContainerInputTokenProps> = ({
  token,
  onSelect,
  onChange,
  value,
}) => {
  return (
    <Container>
      <SelectButton
        onClick={onSelect}
        iconURL={getIconByName(token?.currency ?? '')}
        title={token?.currency ?? ''}
      />
      <TokenInput rate={token?.price ?? 0} onChange={onChange} value={value} />
    </Container>
  );
};

export default ContainerInputToken;
