import './Button.css';

type ButtonTypes = 'equal' | 'darker';

interface ButtonProps {
  id?: string,
  children: string,
  onClick?: React.MouseEventHandler<HTMLButtonElement>,
  type?: ButtonTypes | undefined
}

const Button = ({ id, onClick, children, type }: ButtonProps) => {
  let clazz = 'button';

  switch (type) {
    case 'equal':
      clazz += ' button-darker button-equal';
      break;
    case 'darker':
      clazz += ' button-darker';
      break;
    default:
      break;
  }

  return (
    <button
      id={id}
      className={clazz}
      type="button"
      onClick={onClick}
      tabIndex={-1}>
      {children}
    </button>
  );
}

export default Button;