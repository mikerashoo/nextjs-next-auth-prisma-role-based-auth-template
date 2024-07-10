import { Select, useColorModeValue } from '@chakra-ui/react';
import React from 'react'


export interface IAppSelectOption {
    label: string;
    value?: string;
  }
  
  interface ISelectComboBoxProps {
    placeHolder: string;
    fit?: boolean; 
    options: IAppSelectOption[];
    value?: string;
    onSelect: (selected: string) => void;
  }
function SelectComboBox({placeHolder, options, value, onSelect} : ISelectComboBoxProps) {
  return (
    <Select bg={useColorModeValue('white', 'gray.200')} value={value} onChange={(e) =>onSelect(e.target.value)} placeholder={placeHolder}>
          {options.map((option) => {
          return (
            <option value={option.value} key={option.value}>
              {option.label}
            </option>
          );
        })}
 
</Select>
  )
}

export default SelectComboBox