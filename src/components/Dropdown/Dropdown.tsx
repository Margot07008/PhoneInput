import * as React from 'react';
import { observer } from 'mobx-react';
import cn from 'classnames';

import ArrowIcon from 'components/icons/ArrowIcon';
import { IconDirection, IconSize } from 'components/icons/utils';

import { SelectorItem, SelectorKey } from './config';
import DropdownItem from './DropdownItem';

import './Dropdown.modules.scss';

type Props = {
  optionEntities: Record<any, SelectorItem>;
  optionIds: Array<SelectorKey>;
  selected: SelectorKey | null;
  handleChange: (selected: SelectorKey | null) => void;
  opened: boolean;
  onClose: () => void;
  onOpen: () => void;
  className?: string;
};

const Dropdown: React.FC<Props> = ({
  optionEntities,
  optionIds,
  selected,
  handleChange,
  opened,
  onClose,
  onOpen,
  className,
}) => {
  const handleChangeValue = React.useCallback((selectedKey: SelectorKey) => {
    handleChange(selectedKey);
    onClose();
  }, []);

  return (
    <div
      className={className}
      styleName="country-selector"
      onClick={onOpen}
      onMouseOver={onOpen}
      onMouseLeave={onClose}
    >
      <div styleName="country-selector__title">
        {selected ? optionEntities[selected].emoji : 'Страна'}
        <ArrowIcon
          direction={opened ? IconDirection.top : IconDirection.bottom}
          iconSize={IconSize.L}
        />
      </div>
      <div
        styleName={cn(
          'country-selector__popup',
          opened && 'country-selector__popup_opened',
        )}
      >
        {optionIds.map(id => {
          if (id === selected) {
            return null;
          }
          const country = optionEntities[id];
          return (
            <DropdownItem
              key={country.key}
              onClick={handleChangeValue}
              value={country}
              id={country.key}
            />
          );
        })}
      </div>
    </div>
  );
};

export default observer(Dropdown);
