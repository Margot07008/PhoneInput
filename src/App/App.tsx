import * as React from 'react';

import { masks } from 'shared/entities/phone/plugs';

import PhoneInput from './PhoneInput';

import './App.modules.scss';

const App = () => {
  const handleChange = React.useCallback((value: string) => {
    console.log(value);
  }, []);

  return (
    <div styleName="app-background">
      <div styleName="modal">
        <PhoneInput
          masks={masks}
          value="+7 12 3  456()7- -89-0"
          onChange={handleChange}
        />
      </div>
    </div>
  );
};

export default React.memo(App);
