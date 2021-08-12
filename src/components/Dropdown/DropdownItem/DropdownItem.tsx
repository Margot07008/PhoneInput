import * as React from 'react';
import { SelectorItem, SelectorKey } from '../config';

import './DropdownItem.modules.scss';

type Props = {
  id: SelectorKey;
  onClick: (value: SelectorKey) => void;
  value: SelectorItem;
};

const DropdownItem: React.FC<Props> = ({ id, onClick, value }: Props) => {
  const handleCLick = React.useCallback(() => {
    onClick(id);
  }, []);

  return (
    <div styleName="dropdown-item" onClick={handleCLick}>
      {value.emoji} {value.key}
    </div>
  );
};

export default React.memo(DropdownItem);
