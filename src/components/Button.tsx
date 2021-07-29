import * as React from 'react';

type Props = {
  title: string;
};

let Button: React.FC<Props> = ({ title }: Props) => {
  return <button>{title}</button>;
};

export default Button;
