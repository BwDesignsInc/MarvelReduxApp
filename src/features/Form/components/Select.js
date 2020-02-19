import React from 'react';
import ReactSelect from 'react-select';

const customStyles = {
    menu: (provided, state) => ({
      ...provided,
      width: state.selectProps.width,
      borderBottom: '1px dotted pink',
      color: state.selectProps.menuColor,
      padding: 20,
    }),
    container: base => ({
      ...base,
      flex: 1
    }),
    control: (base) => ({ ...base, width: '300px' }),
    singleValue: (provided, state) => {
      const opacity = state.isDisabled ? 0.5 : 1;
      const transition = 'opacity 300ms';
  
      return { ...provided, opacity, transition };
    }
  }

  const Select = (props) => <ReactSelect styles={customStyles} {...props} />;

  export default Select;