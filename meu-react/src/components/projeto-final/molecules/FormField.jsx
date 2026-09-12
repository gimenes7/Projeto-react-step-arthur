import Input from "../atoms/Input";
import Label from "../atoms/Label";
import "./FormField.css";

const FormField = ({
  id,
  label,
  name,
  type,
  value,
  onChange,
  required,
  as,
  rows,
  min,
  step,
}) => {
  return (
    <div className="form-field">
      <Label htmlFor={id}>{label}</Label>
      <Input
        id={id}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        required={required}
        as={as}
        rows={rows}
        min={min}
        step={step}
      />
    </div>
  );
};

export default FormField;
