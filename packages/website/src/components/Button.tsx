import { FC, SyntheticEvent } from 'react';

type ButtonProps = {
  action: (event: SyntheticEvent<HTMLButtonElement>) => void;
  color: string;
  title: string;
};

const Button: FC<ButtonProps> = (props) => (
  <button
    onClick={props.action}
    className={`${props.color} uppercase`}
  >
    {props.title}
  </button>
);

export default Button;
