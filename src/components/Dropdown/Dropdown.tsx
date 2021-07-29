import * as React from 'react';

import { SelectorItem, SelectorKey } from './config';
import { observer } from 'mobx-react';
import DropdownItem from './DropdownItem';

import './Dropdown.modules.scss';

type Props = {
  optionEntities: Record<any, SelectorItem>;
  optionIds: Array<SelectorKey>;
  selected: SelectorKey | null;
  handleChange: (selected: SelectorKey | null) => void;
};

const Dropdown: React.FC<Props> = ({
  optionEntities,
  optionIds,
  selected,
  handleChange,
}) => {
  return (
    <div styleName="country-selector">
      <div styleName="country-selector__title">
        {selected ? optionEntities[selected].emoji : 'Выберите...'}
      </div>
      {optionIds.map(id => {
        const country = optionEntities[id];
        return (
          <DropdownItem
            onClick={handleChange}
            value={country}
            id={country.key}
          />
        );
      })}
    </div>
  );
};

export default observer(Dropdown);
