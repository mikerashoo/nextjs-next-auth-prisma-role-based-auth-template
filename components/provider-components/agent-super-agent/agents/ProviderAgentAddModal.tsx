
import { AddIcon } from "@chakra-ui/icons";
import {
  useToast,
  CloseButton,
} from "@chakra-ui/react";
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import React, { useState } from "react"; 
import AppForm from "@/components/ui-components/forms/AppForm";
import { InputType } from "@/components/ui-components/forms/app-form-types-helpers"; 
import { HeadlessButton } from "@/components/ui-components/AppButton";
import { useRouter } from "next/router";
import { IAgentRegistrationSchema, agentRegistrationSchema} from "@/utils/shared/schemas/userSchemas";
import { providerCommonAgentApiCalls } from "@/backend-services/provider-api-calls/agent-super-agents/common/provider-agent-common-api-calls";
import { IUser } from "@/utils/shared/shared-types/userModels";

function ProviderAgentAddModal({
  isSuperAgent,
  onUpdate
}: {
  isSuperAgent?: boolean; 
  onUpdate?: (user: IUser) => void;
}) {
   
  let [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [submitError, setSubmitError] = useState<string>();
  const router = useRouter();

  const toast = useToast();
  async function onSubmit(data: IAgentRegistrationSchema) {
    console.log("On Submit called", data)
    // setLoading(true);
    const success = await providerCommonAgentApiCalls.add({...data, isSuperAgent});

    if (success.data) {
      console.log("Submit", success);

      toast({
        status: "success",
        position: "top",
        title: "SuperAgent Added Successfully",
      });
      // setLoading(false);
 
      // setIsOpen(true);
      onUpdate(success.data)
      closeModal(); 
    }

    // setLoading(false);

    return success;
  }

  const closeModal = () => {
    setIsOpen(false);
  };

  return (
    <>
      <HeadlessButton
      addButton
        disabled={loading }
        onClick={() => setIsOpen(true)}
      >
        <AddIcon /> Add 
      </HeadlessButton>
      <Dialog open={isOpen} onClose={closeModal} className="relative z-50">
        {/* The backdrop, rendered as a fixed sibling to the panel container */}
        <DialogBackdrop className="fixed inset-0 bg-black/30" />

        {/* Full-screen container to center the panel */}
        <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
          {/* The actual dialog panel  */}
          <DialogPanel className="w-full max-w-xl space-y-4 bg-white p-12 border">
            <DialogTitle className="font-extrabold flex flex-row justify-between text-teal-500">
               {`New ${isSuperAgent ? 'Super-Agent' : 'Agent'} Form`}
              <CloseButton color={"red.800"} onClick={closeModal} size={"md"} />
            </DialogTitle>

            <AppForm
              submitButtonLabel={"Add Agent"}
              formSchema={{
                inputs: [
                  {
                    label: "FirstName",
                    name: "firstName",
                    inputType: InputType.Text,
                  },
                  {
                    label: "LastName",
                    name: "lastName",
                    inputType: InputType.Text,
                  },
                  {
                    label: "User Name",
                    name: "userName",
                    inputType: InputType.Text,
                  },
                  {
                    label: "Phone Number",
                    name: "phoneNumber",
                    inputType: InputType.Tel,
                  },
                  {
                    label: "Password",
                    name: "password",
                    inputType: InputType.Password,
                  },
                ],
                schema: agentRegistrationSchema,
              }}
              //   const options = Object.values(schema.shape[name]._def.schema._def.innerType._def.values) as string[];

              submitFunction={onSubmit}
             
            />
          </DialogPanel>
        </div>
      </Dialog>
    </>
  );
}
 

export default ProviderAgentAddModal