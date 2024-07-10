import { useRadio, Box, useRadioGroup, HStack, StackDivider, useColorMode, useColorModeValue } from "@chakra-ui/react" 
import { IAppSelectOption } from "./SelectComboBox"
import { ReactNode } from "react"

// 1. Create a component that consumes the `useRadio` hook
function RadioCard(props) {
    const { getInputProps, getRadioProps } = useRadio(props)
  
    const input = getInputProps()
    const checkbox = getRadioProps()

    const {index, isLast, isChecked, additionalComponent} = props;

    const showAddOnly = isChecked && additionalComponent
  
    return (
      <Box as='label'>
        <input {...input} />
        <Box
          {...checkbox}
          cursor='pointer'  
          _checked={{
            bg: useColorModeValue('gray.200', 'gray.900'),   
            color: 'black', 
          }} 
        
          px={{
            base: 2,
            md: 4,
          }}
          py={{
            base: 1,
            md: 2,
          }} 
          className="flex flex-row justify-center items-center h-fit w-full  "
        > 
          <span className={`${showAddOnly ? 'hidden' : ''}`}>{props.children}</span> {props.isChecked && props.additionalComponent}
        </Box>
      </Box>
    )
  }

  interface IChakraRadio extends IAppSelectOption{
    additionalComponent?: ReactNode,

  }

  
  // Step 2: Use the `useRadioGroup` hook to control a group of custom radios.
 export default function ChakraRadio({options, onSelect} : {
    options:   IChakraRadio[],
    onSelect: (value: string) => void;
 }) {
    // const options = ['react', 'vue', 'svelte']
  
    const { getRootProps, getRadioProps } = useRadioGroup({
      name: 'framework',
      defaultValue: 'react',
      onChange: onSelect,
    })
  
    const group = getRootProps()
  
    return (
      <HStack bg={useColorModeValue('white', 'gray.200')}  {...group} spacing={0}   divider={<StackDivider borderColor='gray.200' />} className="border w-full md:w-fit">
        {options.map((option, index) => {
           let additionalComponent = option.additionalComponent;
           let value = option.value;
          const radio = getRadioProps({ value })
          return (
            <RadioCard additionalComponent={additionalComponent} isLast={index == options.length - 1}  key={option.value} index={index} {...radio}>
              {option.label}
            </RadioCard>
          )
        })}
      </HStack>
    )
  } 