import * as React from 'react';
import { observer } from 'mobx-react';

import { PhoneMask } from 'shared/entities/phone';
import { useLocal } from 'shared/utils/useLocal';
import PhoneInputStore from 'stores/PhoneInputStore';
import Dropdown from 'components/Dropdown';

type Props = {
  masks: PhoneMask[];
  value: string;
  onChange: () => void;
};

const PhoneInput: React.FC<Props> = ({ masks, value, onChange }: Props) => {
  const store = useLocal(() => new PhoneInputStore({ masks: masks }));

  console.log('masks', masks);
  console.log('sortedMasks', store.sortedMasks);

  return (
    <>
      <Dropdown
        selected={store.selectedCountryKey}
        handleChange={store.selectCountyKey}
        optionEntities={store.sortedMasks.entities}
        optionIds={store.sortedMasks.keys}
      />
    </>
  );
};

export default observer(PhoneInput);
