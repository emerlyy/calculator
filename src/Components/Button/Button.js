import './Button.css';

const Button = ({ id, onClick, children, type }) => {
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
      onClick={onClick}>
      {children}
    </button>
  );
}

export default Button;