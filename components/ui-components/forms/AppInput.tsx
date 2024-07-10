import {
  FormControl,
  FormLabel,
  FormHelperText,
  FormErrorMessage,
  Input,
  InputProps,
  IconButton,
  InputGroup,
  InputRightElement,
  useDisclosure,
  useMergeRefs,
} from "@chakra-ui/react";
import { EyeSlashIcon, EyeIcon } from "@heroicons/react/20/solid";
import React, { forwardRef, useEffect, useRef, useState } from "react";
import { RegisterOptions, UseFormRegister } from "react-hook-form";

interface IAppInputProps extends InputProps {
  label: string;
  name: string;
  type?: string;
  error?: string;
  isRequired?: boolean;
  isDisabled?: boolean;
  register: UseFormRegister<any>;
}
function AppInput({
  label,
  name,
  type,
  isDisabled,
  isRequired = true,
  error,
  register,
  ...rest
}: IAppInputProps) {
  const { isOpen, onToggle } = useDisclosure();
  const inputRef = useRef<HTMLInputElement>(null);

  const [inputType, setType] = useState(type ?? 'text')

  const onClickReveal = () => {
    onToggle();
    
  };

  useEffect(() => {
    if(type == 'password' ){
      setType(!isOpen ? 'password' : 'text');
    }
  }, [isOpen, type])
  
  return (
    <FormControl
      isDisabled={isDisabled}
      isRequired={isRequired}
      isInvalid={error && error != null && error.length > 0}
    >
      <FormLabel htmlFor={name}>{label}</FormLabel>
      <InputGroup>
        {type == "password" && (
          <InputRightElement>
            <IconButton
              variant="text"
              aria-label={isOpen ? "Mask password" : "Reveal password"}
              icon={
                isOpen ? <EyeSlashIcon width={16} /> : <EyeIcon width={16} />
              }
              onClick={onClickReveal}
            />
          </InputRightElement>
        )}
        <Input
          focusBorderColor="teal.300"
          errorBorderColor="red.300"
          ref={inputRef}

          id={name}
          {...register(name)}
          type={inputType} 
          visibility={'visible'}
        />
      </InputGroup>

      <FormErrorMessage>{error}</FormErrorMessage>
    </FormControl>
  );
}

export const PasswordField = forwardRef<HTMLInputElement, InputProps>(
  (props, ref)  => {
    const { isOpen, onToggle } = useDisclosure();
    const inputRef = useRef<HTMLInputElement>(null);

    const mergeRef = useMergeRefs(inputRef, ref);
    const onClickReveal = () => {
      onToggle();
      if (inputRef.current) {
        inputRef.current.focus({ preventScroll: true });
      }
    };

    return (
      <FormControl isRequired>
        <FormLabel htmlFor="password">Password</FormLabel>
        <InputGroup>
          <InputRightElement>
            <IconButton
              variant="text"
              aria-label={isOpen ? "Mask password" : "Reveal password"}
              icon={
                isOpen ? <EyeSlashIcon width={16} /> : <EyeIcon width={16} />
              }
              onClick={onClickReveal}
            />
          </InputRightElement>
          <Input
            id="password"
            ref={mergeRef}
            name="password"
            type={isOpen ? "text" : "password"}
            autoComplete="current-password"
            required
            {...props}
          />
        </InputGroup>
      </FormControl>
    );
  }
);

PasswordField.displayName = "PasswordField";
export default AppInput;
