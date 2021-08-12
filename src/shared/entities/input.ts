export type ChangeEventHandler = (value: string) => void;

export type BaseInputProps = {
  value: string;
  onChange: ChangeEventHandler;
  isFocused?: boolean;
  placeholder?: string;
  onFocus?: () => void;
  type?: InputType;
  maxLength?: number;
};

export type WrappedInputProps = Omit<BaseInputProps, 'onChange'> & {
  actualIdx: string | number;
  onChange: (actualIdx: string | number, value: string) => void;
};

export enum InputType {
  number = 'number',
  text = 'text',
}
