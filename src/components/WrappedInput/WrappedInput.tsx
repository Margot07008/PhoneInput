import * as React from 'react';

import { WrappedInputProps } from 'shared/entities/input';

import Input from '../Input';

const WrappedInput: React.FC<WrappedInputProps> = ({
  value,
  onChange,
  actualIdx,
  type,
  maxLength,
}: WrappedInputProps) => {
  const handleChange = React.useCallback(
    (text: string) => {
      onChange(actualIdx, text);
    },
    [onChange],
  );

  return (
    <Input
      maxLength={maxLength}
      type={type}
      value={value}
      onChange={handleChange}
    />
  );
};

export default React.memo(WrappedInput);
