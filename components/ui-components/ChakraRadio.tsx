import { useRadio, Box, useRadioGroup, HStack, StackDivider, useColorMode, useColorModeValue, Button } from "@chakra-ui/react" 
import { IAppSelectOption } from "./SelectComboBox"
import { ReactNode } from "react"
 
function RadioCard(props) {
  const { getInputProps, getRadioProps } = useRadio(props)

  const input = getInputProps()
  const checkbox = getRadioProps()

  return (
    <Box as='label'  >
      <input {...input} />
      <Box
        {...checkbox}
        cursor='pointer'
        borderWidth='1px'
        borderRadius='md'
        boxShadow='md'
        bg= 'white'

        _checked={{
          bg: 'teal.600',
          color: 'white',
          borderColor: 'teal.600',
        }}
        _focus={{
          boxShadow: 'outline',
        }}
        px={2}
        py={1}
      >
        {props.children}
      </Box>
    </Box>
  )
}


  interface IChakraRadio {
    label: any;
    value?: string;

  }

  
  // Step 2: Use the `useRadioGroup` hook to control a group of custom radios.
 export default function ChakraRadio({options, onSelect, selected, isDisabled} : {
    options:   IChakraRadio[],
    onSelect: (value: string) => void;
    selected: string;
    isDisabled?: boolean
 }) {
    // const options = ['react', 'vue', 'svelte']
  
    const { getRootProps, getRadioProps } = useRadioGroup({
      name: 'period', 
      value: selected,
      onChange: onSelect,
      isDisabled,
      
    })
  
    // const group = getRootProps()

    const group = getRootProps()

  return (
    <HStack {...group} className="w-full" >
        {options.map((option, index) => { 
           let value = option.value;
          const radio = getRadioProps({ value })
          return (
            <RadioCard  isLast={index == options.length - 1}  key={option.value} index={index} {...radio}>
              {option.label}
            </RadioCard>
          )
        })}
    </HStack>
  )
   
  } 