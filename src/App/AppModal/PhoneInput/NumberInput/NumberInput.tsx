import * as React from 'react';
import { observer } from 'mobx-react';
import cn from 'classnames';

import NumbersStore from 'stores/NumbersStore';
import WrappedInput from 'components/WrappedInput';
import { useEventListener } from 'shared/utils/hooks';

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

  useEventListener('keydown', store.handleKeydown);

  return (
    <div styleName="inputs-container">
      <div styleName="inputs-container__text">
        {store.phoneNumber.prefix}&nbsp;
      </div>
      {store.fields.map((item, idx) => {
        return item.canEdit ? (
          <div
            key={idx}
            styleName={cn(
              'inputs-container__field',
              !item.value && 'inputs-container__field_error',
            )}
          >
            <WrappedInput
              onClick={store.setActiveField}
              actualIdx={idx}
              value={item.value}
              onChange={handleChangeInput}
              maxLength={1}
              isActive={idx === store.activeField}
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
