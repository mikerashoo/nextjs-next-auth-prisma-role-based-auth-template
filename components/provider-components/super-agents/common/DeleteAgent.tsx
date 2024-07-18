import { providerSuperAgentListApiCalls } from '@/backend-services/provider-api-calls/super-agent-management/super-agent-list-api-calls';
import { ConfirmationDialog } from '@/components/ui-components/modals/ConfirmationDialog'
import { getFullName } from '@/utils/common-hepers';
import { IUser } from '@/utils/shared/shared-types/userModels';
import { DeleteIcon } from '@chakra-ui/icons'
import { useToast } from '@chakra-ui/react';
import React from 'react'

function DeleteAgent({agent, onDelete} : {agent: IUser, onDelete: (agentId: string) => void}) {

    const toast = useToast();

    const deleteAgent = async (): Promise<boolean> => {
        const deleteData = await providerSuperAgentListApiCalls.delete( 
          agent.id,
        );
        if (deleteData.errorMessage) {
          toast( {
            title: deleteData.errorMessage,
            status: "error",
          id: 'delete-' + agent.id
          });
          return false;
        } else {
          toast({
            title: "Agent Deleted Successfully",
            status: "success",
            id: 'delete-' + agent.id
          });

          onDelete(agent.id);
        }
        return deleteData.data;

      };
  return (
    <ConfirmationDialog
    openButtonLabel={
      <>
        {" "}
        <DeleteIcon /> Delete{" "}
      </>
    }
    title={"Delete " + getFullName(agent) + "?"}
    message="Are you sure you want to delete this super agent?"
    onConfirm={() => deleteAgent()}
    confirmButtonLabel="Yes Delete!"
    cancelButtonLabel="No Close!"
    key={'delete-' + agent.id}
  />
  )
}

export default DeleteAgent