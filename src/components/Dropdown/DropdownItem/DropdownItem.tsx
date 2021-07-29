import * as React from 'react';
import { SelectorItem, SelectorKey } from '../config';

type Props = {
  id: SelectorKey;
  onClick: (value: SelectorKey) => void;
  value: SelectorItem;
};

const DropdownItem: React.FC<Props> = ({ id, onClick, value }: Props) => {
  const handleCLick = React.useCallback(() => {
    console.log(value);
    onClick(id);
  }, []);

  return (
    <div onClick={handleCLick}>
      {value.emoji} {value.key}
    </div>
  );
};

export default React.memo(DropdownItem);
