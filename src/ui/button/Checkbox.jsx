import { StyledCheckbox } from "./Checkbox.styles";

const Checkbox = ({ checked, onChange, disabled = false, id, children }) => {
  return (
    <StyledCheckbox>
      <input
        type='checkbox'
        id={id}
        checked={checked}
        onChange={onChange}
        disabled={disabled}
      />
      <label htmlFor={!disabled ? id : ""}>{children}</label>
    </StyledCheckbox>
  );
};

export default Checkbox;
