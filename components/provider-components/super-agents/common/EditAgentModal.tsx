
import { InfoOutlineIcon } from "@chakra-ui/icons";
import { useToast } from "@chakra-ui/react";
import { useState } from "react";  
import { HeadlessButton } from "@/components/ui-components/AppButton";
import AppForm from "@/components/ui-components/forms/AppForm";
import { InputType } from "@/components/ui-components/forms/app-form-types-helpers";
import AppModal from "@/components/ui-components/modals/AppModal"; 
import { getFullName } from "@/utils/common-hepers";
import { IUser } from "@/utils/shared/shared-types/userModels"; 
import { IUserUpdateSchema, userUpdateSchema } from "@/lib/schemas/userSchemas";
import { providerSuperAgentListApiCalls } from "@/backend-services/provider-api-calls/super-agent-management/super-agent-list-api-calls";

export default function EditAgentModal({
  agent, 
  onUpdate
}: {
  agent: IUser; 
  onUpdate: (agent: IUser) => void;
}) {
 
    const [loading, setLoading] = useState(false)
 
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const toast = useToast();
  async function onSubmit(data: IUserUpdateSchema) {
    // setLoading(true);
    const success = await providerSuperAgentListApiCalls.update(agent.id, data);

    if (success.data) {
    console.log("Submit", success)

      toast({
        status: "success",
        position: "top",
        title: "Agent Updated Successfully",
      });
      setLoading(false);
      onUpdate(success.data)

      setIsOpen(!isOpen);
    }
    
    setLoading(false);

    return success;
  }

  return (
    <AppModal
      isOpen={isOpen}
      loading={loading}
      title={"Edit " + getFullName(agent)}
      toggleButton={
        <HeadlessButton editButton>
          <InfoOutlineIcon /> Edit
        </HeadlessButton>
      }
    >
      <AppForm
        submitButtonLabel={"Update " + getFullName(agent)}
        formSchema={{
          inputs: [
            
            {
              label: "First Name",
              name: "firstName",
              inputType: InputType.Text,
            },
            {
                label: "Last Name",
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
          
          ],
          schema: userUpdateSchema,
        }}
        //   const options = Object.values(schema.shape[name]._def.schema._def.innerType._def.values) as string[];

        defaultValues={{
          firstName: agent.firstName,
          lastName: agent.lastName,
          userName: agent.userName,
          phoneNumber: agent.phoneNumber,
          id: agent.id
            
        }}
        submitFunction={onSubmit}
      />
    </AppModal>
  );
} 