import { useDisclosure, AlertDialog, AlertDialogOverlay, AlertDialogContent, AlertDialogHeader, AlertDialogCloseButton, AlertDialogBody, AlertDialogFooter, Switch, FormLabel, FormControl } from "@chakra-ui/react";
import React, { ReactNode, useState } from "react";
import { HeadlessButton } from "../AppButton";
import StatusIcon from "../StatusIcon";

export interface IConfirmationDialogProps {
    openButtonLabel: string | ReactNode;
    title: string;
    message: string;
    cancelButtonLabel?: string;
    confirmButtonLabel?: string;
    onConfirm: () => Promise<boolean>;
  }
  export function ConfirmationDialog({
    message,
    onConfirm,
    openButtonLabel,
    title,
    confirmButtonLabel,
    cancelButtonLabel,
  }: IConfirmationDialogProps) {
    const { isOpen, onOpen, onClose } = useDisclosure();
    let [loading, setIsLoading] = useState(false);
    const cancelRef = React.useRef();
  
    const handleConfirm = async () => {
      setIsLoading(true);
      const result = await onConfirm();
      console.log("Result", result);
      if (result == true) {
        onClose();
      }
      setIsLoading(false);
    };
  
    const close = () => {
      if (loading) return;
      onClose();
    };
  
    return (
      <span>
        <HeadlessButton deleteButton onClick={onOpen}>
          {openButtonLabel}
        </HeadlessButton>
        <AlertDialog
          motionPreset="slideInBottom"
          leastDestructiveRef={cancelRef}
          onClose={close}
          isOpen={isOpen}
          isCentered
        >
          <AlertDialogOverlay />
  
          <AlertDialogContent>
            <AlertDialogHeader>{title}</AlertDialogHeader>
            <AlertDialogCloseButton />
            <AlertDialogBody>{message}</AlertDialogBody>
            <AlertDialogFooter className="space-x-2">
              <HeadlessButton status={0} loading={loading} onClick={close}>
                {cancelButtonLabel ?? "No"}
              </HeadlessButton>
              <HeadlessButton
                loading={loading}
                onClick={handleConfirm}
                deleteButton
              >
                {confirmButtonLabel ?? "Yes"}
              </HeadlessButton>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </span>
    );
  }
  

  
  export interface IConfirmationDialogWithSwitchProps { 
    title: string;
    message: string; 
    isChecked: boolean;
    confirmButtonLabel?: string;
    toEnable?: boolean;
    cancelButtonLabel?: string;
    onConfirm: () => Promise<boolean>;
    switchLabel?: string;
    
  }
  export function ConfirmationDialogWithSwitch({
    message,
    onConfirm, 
    title,
    isChecked,
    switchLabel,
    confirmButtonLabel,
    cancelButtonLabel,
  }: IConfirmationDialogWithSwitchProps) {
    const { isOpen, onOpen, onClose } = useDisclosure();
    let [loading, setIsLoading] = useState(false);
    const cancelRef = React.useRef();
  
    const handleConfirm = async () => {
      setIsLoading(true);
      const result = await onConfirm();
      console.log("Result", result);
      if (result) {
        onClose();
      }
      setIsLoading(false);
    };
  
    const close = () => {
      if (loading) return;
      onClose();
    };
  

    const onSwitch = (e) => {

    }
    return (
      <span>
        <FormControl display='flex' alignItems='center'>
  <FormLabel htmlFor='email-alerts' mb='0'>
    <StatusIcon isActive={isChecked} />
  </FormLabel>
  <Switch   colorScheme={'green'} className="ml-2" onChange={onOpen} isChecked={isChecked}/>
  
</FormControl> 
         
        <AlertDialog
          motionPreset="slideInBottom"
          leastDestructiveRef={cancelRef}
          onClose={close}
          isOpen={isOpen}
          isCentered
        >
          <AlertDialogOverlay />
  
          <AlertDialogContent>
            <AlertDialogHeader>{title}</AlertDialogHeader>
            <AlertDialogCloseButton />
            <AlertDialogBody>{message}</AlertDialogBody>
            <AlertDialogFooter className="space-x-2">
              <HeadlessButton status={0} loading={loading} onClick={close}>
                {cancelButtonLabel ?? "No"}
              </HeadlessButton>
              <HeadlessButton
                loading={loading}
                onClick={handleConfirm}
             deleteButton={isChecked}
             addButton={!isChecked}
              >
                {confirmButtonLabel ?? "Yes"}
              </HeadlessButton>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </span>
    );
  }