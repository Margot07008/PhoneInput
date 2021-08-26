import * as React from 'react';

import { WrappedInputProps } from 'shared/entities/input';

import Input from '../Input';

const WrappedInput: React.FC<WrappedInputProps> = ({
  value,
  onChange,
  actualIdx,
  type,
  maxLength,
  isActive,
  onClick,
}: WrappedInputProps) => {
  const handleChange = React.useCallback(
    (text: string) => {
      onChange(actualIdx, text);
    },
    [onChange],
  );

  const handleClick = React.useCallback(() => {
    onClick(actualIdx);
  }, [onClick]);

  return (
    <Input
      maxLength={maxLength}
      type={type}
      value={value}
      onChange={handleChange}
      isFocused={isActive}
      onFocus={handleClick}
    />
  );
};

export default React.memo(WrappedInput);
