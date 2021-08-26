import * as React from 'react';

import { BaseInputProps, InputType } from 'shared/entities/input';

import './Input.modules.scss';

const Input: React.FC<BaseInputProps> = ({
  value,
  onChange,
  isFocused = false,
  placeholder,
  onFocus,
  type = InputType.text,
  maxLength,
}: BaseInputProps) => {
  const inputRef = React.useRef<HTMLInputElement>(null);

  React.useEffect(() => {
    if (inputRef.current && isFocused) {
      inputRef.current.focus();
      if (maxLength) {
        inputRef.current.selectionEnd = maxLength;
      }
    }
  }, [isFocused]);

  const handleChange = React.useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      onChange(e.target.value);
    },
    [onChange],
  );

  return (
    <input
      type={type}
      styleName="input"
      placeholder={placeholder}
      value={value}
      onFocus={onFocus}
      onChange={handleChange}
      ref={inputRef}
      maxLength={maxLength}
    />
  );
};

export default Input;
