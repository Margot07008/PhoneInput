import * as React from 'react';
import { observer } from 'mobx-react';
import cn from 'classnames';

import { PhoneMaskServer } from 'shared/entities/phone';
import { useLocalStore } from 'shared/utils/hooks';
import PhoneInputStore from 'stores/PhoneInputStore';
import Dropdown from 'components/Dropdown';
import NumbersStore from 'stores/NumbersStore';

import NumberInput from './NumberInput';

import './PhoneInput.modules.scss';

type Props = {
  masks: PhoneMaskServer[];
  value: string;
  onChange: (value: string) => void;
};

const PhoneInput: React.FC<Props> = ({ masks, value, onChange }: Props) => {
  const store = useLocalStore(() => new PhoneInputStore({ masks: masks }));
  const storeNumber = React.useMemo(() => {
    if (!store.selectedCountryData) {
      return null;
    }
    return new NumbersStore({
      phoneNumber: store.selectedCountryData,
      value: value,
    });
  }, [store.selectedCountryData]);

  console.log({ value: value, refactor: storeNumber?.fields });

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
    <>
      <div styleName="content" onClick={handleCLosePopup}>
        <Dropdown
          styleName={cn('dropdown', !storeNumber && 'dropdown_margin')}
          opened={openedPopup}
          onClose={handleCLosePopup}
          onOpen={handleOpenPopup}
          selected={store.selectedCountryKey}
          handleChange={store.selectCountyKey}
          optionEntities={store.sortedMasks.entities}
          optionIds={store.sortedMasks.keys}
        />
        {storeNumber && <NumberInput store={storeNumber} onChange={onChange} />}
      </div>
      {storeNumber && !storeNumber.isUserInputValid && (
        <div styleName="content__error-message">
          Некорректный номер телефона!
        </div>
      )}
    </>
  );
};

export default observer(PhoneInput);
