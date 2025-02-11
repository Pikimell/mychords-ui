import style from './Button.module.css';

const Button = ({ primary, children, className, ...props }) => {
  const classes = ` ${className} ${primary ? style['primary'] : ''}`;
  return (
    <button className={style['button'] + classes} {...props}>
      {children}
    </button>
  );
};

export default Button;
