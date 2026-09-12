import "./ui.css";

const Input = ({
  id,
  name,
  type = "text",
  value,
  onChange,
  required,
  as = "input",
  rows,
  min,
  step,
  placeholder,
}) => {
  const Tag = as;

  return (
    <Tag
      id={id}
      name={name}
      type={as === "input" ? type : undefined}
      value={value}
      onChange={onChange}
      required={required}
      rows={as === "textarea" ? rows : undefined}
      min={min}
      step={step}
      placeholder={placeholder}
      className="input"
    />
  );
};

export default Input;
