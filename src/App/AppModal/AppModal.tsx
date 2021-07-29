import * as React from 'react';

import PhoneInput from 'components/PhoneInput';

import { masks } from 'shared/entities/phone/plugs';

import './AppModal.modules.scss';

const AppModal = () => {
  const handleChange = React.useCallback(() => {
    console.log('kek');
  }, []);
  return (
    <div styleName="app-background">
      <div styleName="modal">
        <PhoneInput
          masks={masks}
          value="+71234567890"
          onChange={handleChange}
        />
      </div>
    </div>
  );
};

export default AppModal;
