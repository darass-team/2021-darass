import { Label, Input } from "./styles";

export interface Props {
  isChecked: boolean;
  onChange: () => void;
  labelText?: string;
}

const CheckBox = ({ isChecked, onChange, labelText = "" }: Props) => {
  return (
    <Label>
      <Input type="checkbox" checked={isChecked} onChange={onChange} hasLabelText={!!labelText} />
      {labelText}
    </Label>
  );
};

export default CheckBox;
