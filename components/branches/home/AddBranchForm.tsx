import { branchInformationApiService } from '@/backend-services/branches/information';
import { GENERAL_ERROR_MESSAGE } from '@/utils/constants';
import { IBranchCreateSchema, branchCreateSchema } from '@/utils/shared/schemas/provider/branch-information-schema';
import { AddIcon } from '@chakra-ui/icons';
import { useToast, CloseButton, Stack, Alert, AlertIcon } from '@chakra-ui/react';
import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import { HeadlessButton } from '../../ui-components/AppButton';
import AppInput from '../../ui-components/forms/AppInput';
import { useBranchListContext } from '@/contexts/branch-contexts/BranchIListContext';

function AddBranchForm() {
   
  const {error, loading, reload} = useBranchListContext();

    let [isOpen, setIsOpen] = useState(false);
    const [submitError, setSubmitError] = useState<string>();
  
    const toast = useToast();
    const {
      handleSubmit,
      register,
      reset,
      formState: { errors, isSubmitting },
    } = useForm<IBranchCreateSchema>({
      resolver: zodResolver(branchCreateSchema),
      mode: "onSubmit",
      reValidateMode: "onSubmit",
    });
  
    async function onSubmit(data: IBranchCreateSchema) {
      try {
        setSubmitError(null);
        const add = await branchInformationApiService.add(data);
        console.log("Add response", add)
        if (add.errorMessage) {
          setSubmitError(add.errorMessage);
        } else {
          toast({
            status: 'success',
            position: 'top',
            title: "Branch Added Successfully",
          });
          setTimeout(() => {
            closeModal();
            reload()
            
          }, 500);
        }
        return;
   
      } catch (error) {
        setSubmitError(GENERAL_ERROR_MESSAGE);
  
        // setError("Something went wrong please try again");
        // Handle errors, such as showing an alert or setting an error state
        console.error("adding branch error", error);
      }
    }
  
    const closeModal = () => {
      reset();
      setIsOpen(false);
    }
  
    return (
      <>
        <HeadlessButton addButton full disabled={loading || error != null} onClick={() => setIsOpen(true)}>
          <AddIcon /> Add Branch
        </HeadlessButton>
        <Dialog
          open={isOpen}
          onClose={closeModal}
          className="relative z-50"
        >
          {/* The backdrop, rendered as a fixed sibling to the panel container */}
          <DialogBackdrop className="fixed inset-0 bg-black/30" />
  
          {/* Full-screen container to center the panel */}
          <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
            {/* The actual dialog panel  */}
            <DialogPanel className="w-full max-w-xl space-y-4 bg-white p-12 border">
              <DialogTitle className="font-extrabold flex flex-row justify-between text-teal-500">Add New Branch <CloseButton color={'red.800'} onClick={closeModal} size={'md'}/></DialogTitle>
  
              <form onSubmit={handleSubmit(onSubmit)}>
                <Stack spacing="5">
                  <Stack spacing="5">
                    <AppInput
                      label="Name"
                      isRequired={true}
                      error={errors.name?.message}
                      name="name"
                      register={register}
                      isDisabled={isSubmitting}
                    />
                    <AppInput
                      label="Address"
                      isRequired={true}
                      error={errors.name?.message}
                      name="address"
                      register={register}
                      isDisabled={isSubmitting}
  
                    />
                  </Stack>
  
                  <Stack spacing="6">
                    {submitError && (
                      <Alert status="error">
                        <AlertIcon />
                        {submitError}
                      </Alert>
                    )}
  
                    <HeadlessButton
                      addButton
                      full
                      loading={isSubmitting}
                      loadinglabel="Submitting"
                      type="submit"
                    >
                      Add
                    </HeadlessButton>
  
                    {/* Other components remain unchanged */}
                  </Stack>
                </Stack>
              </form>
             
            </DialogPanel>
          </div>
        </Dialog>
      </>
    );
}

export default AddBranchForm