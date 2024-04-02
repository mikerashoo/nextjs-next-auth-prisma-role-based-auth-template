import {
    FormControl,
    FormLabel,
    IconButton,
    Input,
    InputGroup,
    InputProps,
    InputRightElement,
    useDisclosure,
    useMergeRefs,
  } from '@chakra-ui/react'
import { EyeDropperIcon, EyeIcon, EyeSlashIcon } from '@heroicons/react/20/solid'
  import { forwardRef, useRef } from 'react' 
  
  export const PasswordField = forwardRef<HTMLInputElement, InputProps>((props, ref) => {
    const { isOpen, onToggle } = useDisclosure()
    const inputRef = useRef<HTMLInputElement>(null)
  
    const mergeRef = useMergeRefs(inputRef, ref)
    const onClickReveal = () => {
      onToggle()
      if (inputRef.current) {
        inputRef.current.focus({ preventScroll: true })
      }
    }
  
    return (
      <FormControl isRequired>
        <FormLabel htmlFor="password">Password</FormLabel>
        <InputGroup>
          <InputRightElement>
            <IconButton
              variant="text"
              aria-label={isOpen ? 'Mask password' : 'Reveal password'}
              icon={isOpen ? <EyeSlashIcon width={16}/> : <EyeIcon width={16} />}
              onClick={onClickReveal}
            />
          </InputRightElement>
          <Input
            id="password"
            ref={mergeRef}
            name="password"
            type={isOpen ? 'text' : 'password'}
            autoComplete="current-password"
            required
            {...props}
          />
        </InputGroup>
      </FormControl>
    )
  })
  
  PasswordField.displayName = 'PasswordField'