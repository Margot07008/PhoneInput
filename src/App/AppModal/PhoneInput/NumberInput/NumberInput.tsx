import * as React from 'react';
import { observer } from 'mobx-react';

import NumbersStore from 'stores/NumbersStore';
import WrappedInput from 'components/WrappedInput';

import './NumberInput.modules.scss';

type Props = {
  store: NumbersStore;
  onChange: (value: string) => void;
};

const NumberInput: React.FC<Props> = ({ store, onChange }: Props) => {
  const handleChangeInput = React.useCallback(
    (actualIdx: number, value: string) => {
      store.setField(actualIdx, value);
      onChange(store.inputResult);
    },
    [store.setField],
  );

  return (
    <div styleName="inputs-container">
      <div styleName="inputs-container__text">
        {store.phoneNumber.prefix}&nbsp;
      </div>
      {store.fields.map((item, idx) => {
        return item.canEdit ? (
          <div key={idx} styleName="inputs-container__field">
            <WrappedInput
              actualIdx={idx}
              value={item.value}
              onChange={handleChangeInput}
              maxLength={1}
            />
          </div>
        ) : (
          <div styleName="inputs-container__text" key={idx}>
            {item.value !== ' ' && <>{item.value}</>}
          </div>
        );
      })}
    </div>
  );
};

export default observer(NumberInput);
