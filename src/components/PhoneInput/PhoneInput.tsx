import * as React from 'react';
import { observer } from 'mobx-react';

import { PhoneMask } from 'shared/entities/phone';
import { useLocal } from 'shared/utils/useLocal';
import PhoneInputStore from 'stores/PhoneInputStore';
import Dropdown from 'components/Dropdown';

import './PhoneInput.modules.scss';

type Props = {
  masks: PhoneMask[];
  value: string;
  onChange: () => void;
};

const PhoneInput: React.FC<Props> = ({ masks, value, onChange }: Props) => {
  const store = useLocal(() => new PhoneInputStore({ masks: masks }));
  const [openedPopup, setOpenedPopup] = React.useState(false);

  const handleCLosePopup = React.useCallback(() => {
    if (openedPopup) {
      setOpenedPopup(false);
    }
  }, [openedPopup]);

  const handleOpenPopup = React.useCallback(() => {
    if (!openedPopup) {
      setOpenedPopup(true);
    }
  }, [openedPopup]);

  return (
    <div styleName="content" onClick={handleCLosePopup}>
      <Dropdown
        opened={openedPopup}
        onClose={handleCLosePopup}
        onOpen={handleOpenPopup}
        selected={store.selectedCountryKey}
        handleChange={store.selectCountyKey}
        optionEntities={store.sortedMasks.entities}
        optionIds={store.sortedMasks.keys}
      />
      <div>{store.selectedCountryData?.mask}</div>
    </div>
  );
};

export default observer(PhoneInput);
