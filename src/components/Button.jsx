import "./Button.css";

export default function Button({
  id,
  text,
  action,
  type = "button",
  variant = "primary",
  ...props
}) {
  return (
    <button
      id={id}
      type={type}
      className={`button ${variant}`}
      onClick={action}
      {...props}
    >
      {text}
    </button>
  );
}
