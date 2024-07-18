import { branchInformationApiService } from '@/backend-services/provider-api-calls/branches/information'; 
import { providerSuperAgentListApiCalls } from '@/backend-services/provider-api-calls/super-agent-management/super-agent-list-api-calls';
import { HeadlessButton } from '@/components/ui-components/AppButton';
import AppForm from '@/components/ui-components/forms/AppForm';
import { InputType } from '@/components/ui-components/forms/app-form-types-helpers';
import AppModal from '@/components/ui-components/modals/AppModal';
import { useBranchCashiersContext } from '@/contexts/branch-contexts/BranchCashierContext';
import { getFullName } from '@/utils/common-hepers'; 
import { IChangePasswordSchema, changePasswordSchema } from '@/utils/shared/schemas/userSchemas'; 
import { IUser } from '@/utils/shared/shared-types/userModels';
import { Button, useToast } from '@chakra-ui/react';
import { KeyIcon } from '@heroicons/react/20/solid';
import React, { useState } from 'react'

function ChangeAgentPassword({agent} : {agent: IUser}) { 
  const [loading, setLoading] = useState(false)
 
    const [isOpen, setIsOpen] = useState<boolean>(false);
  
    const toast = useToast();
    async function onSubmit(data: IChangePasswordSchema) {
      // setLoading(true);
      const success = await providerSuperAgentListApiCalls.changePassword(agent.id, data);
 
  
      if (success.data) { 
  
        toast({
          status: "success",
          position: "top",
          title: "Password Changed Successfully",
        });
        setLoading(false);
  
        setIsOpen(!isOpen); 
      }else {
        setLoading(false);

      }
      
  
      return success; 
    }
  
    return (
      <AppModal
        isOpen={isOpen}
        loading={loading}
        title={"Change Password of " + getFullName(agent)}
        toggleButton={
          <HeadlessButton  status={0}>
            <KeyIcon color='orange' width={24} /> 
            
          </HeadlessButton>
        }
      > 
        <AppForm
          submitButtonLabel={"Update password"}
          formSchema={{
            inputs: [
                {
                    label: "New Password",
                    name: "password",
                    inputType: InputType.Password,
                  },
            ],
            schema: changePasswordSchema,
          }}
          //   const options = Object.values(schema.shape[name]._def.schema._def.innerType._def.values) as string[];
  
          
          submitFunction={onSubmit}
        />
      </AppModal>
    );
}

export default ChangeAgentPassword