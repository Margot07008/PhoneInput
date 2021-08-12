import * as React from 'react';
import cn from 'classnames';

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
      styleName={cn('input', isFocused && 'input_focused')}
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
