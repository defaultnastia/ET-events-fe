import css from "./Button.module.css";

const Button = ({ btnType, children, onClick }) => {
  const applyStyle = () => {
    switch (btnType) {
      case "register":
        return css.register;
      case "view":
        return css.view;
      default:
        return css.view;
    }
  };

  return (
    <button className={applyStyle(btnType)} onClick={onClick}>
      {children}
    </button>
  );
};

export default Button;
