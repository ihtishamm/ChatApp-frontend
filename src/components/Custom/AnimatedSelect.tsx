import Select, { components, MultiValue, OptionProps, StylesConfig } from 'react-select';
import makeAnimated from 'react-select/animated';

interface OptionType {
  value: string;
  label: string;
  avatar?: string;
}

interface AnimatedMultiSelectProps {
  options: OptionType[];
  onChange: (selectedOptions: MultiValue<OptionType>) => void;
}

const animatedComponents = makeAnimated();

const customStyles: StylesConfig<OptionType, true> = {
  control: (provided, state) => ({
    ...provided,
    borderColor: state.isFocused ? 'black' : provided.borderColor,
    boxShadow: state.isFocused ? '0 0 0 1px black' : provided.boxShadow,
    '&:hover': {
      borderColor: 'black',
    },
  }),
  option: (provided, state) => ({
    ...provided,
    backgroundColor: state.isSelected ? 'black' : state.isFocused ? 'lightgray' : provided.backgroundColor,
    color: state.isSelected ? 'white' : provided.color,
    display: 'flex',
    alignItems: 'center',
  }),
  multiValue: (provided) => ({
    ...provided,
    backgroundColor: 'black',
    color: 'white',
  }),
  multiValueLabel: (provided) => ({
    ...provided,
    color: 'white',
  }),
  multiValueRemove: (provided) => ({
    ...provided,
    color: 'white',
    ':hover': {
      backgroundColor: 'darkgray',
      color: 'black',
    },
  }),
  singleValue: (provided) => ({
    ...provided,
    display: 'flex',
    alignItems: 'center',
  }),
};

const Option = (props: OptionProps<OptionType>) => (
  <components.Option {...props}>
    <img
      src={props.data.avatar}
      alt=""
      style={{ width: 30, height: 30, borderRadius: '50%', marginRight: 10 }}
    />
    {props.data.label}
  </components.Option>
);

export default function AnimatedMultiSelect({ options, onChange }: AnimatedMultiSelectProps) {
  return (
    <Select
      closeMenuOnSelect={false}
      components={{ ...animatedComponents, Option }}
      isMulti
      options={options}
      styles={customStyles}
      onChange={onChange}
    />
  );
}
