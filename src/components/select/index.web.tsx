import { FC } from 'react';
import { palette } from '../../styles';

type SelectPropsType = {
  data: DataType[];
  handleChange: ChangeHandler;
  defaultLabel?: string;
  value?: string;
};
type ChangeHandler = (newQuery: string) => void;
type DataType = {
  id: string;
  value: string;
};

export const Select: FC<SelectPropsType> = ({
  data,
  handleChange,
  defaultLabel,
  value = '',
}) => {
  const onChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = event.target.value;
    handleChange(selectedValue);
  };

  return (
    <select
      value={value}
      onChange={onChange}
      style={{ ...selectStyles, backgroundColor: palette.mainBgColor }}
    >
      {defaultLabel && <option value="">{defaultLabel}</option>}
      {data.map((option) => (
        <option
          key={option.id}
          value={option.value}
          style={{
            backgroundColor:
              option.value === value
                ? palette.accentColor
                : palette.mainBgColor,
          }}
        >
          {option.id}
        </option>
      ))}
    </select>
  );
};

const selectStyles = {
  maxWidth: 140,
  padding: 0,
  paddingHorizontal: 6,
  height: 40,
  borderRadius: 0,
  borderWidth: 0,
  color: 'white',
  outlineColor: 'transparent',
  outlineOffset: -1,
  cursor: 'pointer',
  fontWeight: '500',
  fontSize: 16,
};
