import { providerSuperAgentListApiCalls } from "@/backend-services/provider-api-calls/super-agent-management/super-agent-list-api-calls";
import {
  ConfirmationDialog,
  ConfirmationDialogWithSwitch,
} from "@/components/ui-components/modals/ConfirmationDialog";
import { getFullName } from "@/utils/common-hepers";
import { GENERAL_ERROR_MESSAGE } from "@/utils/constants";
import { ActiveStatus } from "@/utils/shared/shared-types/prisma-enums";
import { IUser } from "@/utils/shared/shared-types/userModels";
import { DeleteIcon } from "@chakra-ui/icons";
import { useToast } from "@chakra-ui/react";
import React from "react";

function ChangeAgentStatus({
  agent,
  onUpdate,
}: {
  agent: IUser;
  onUpdate: (agent: IUser) => void;
}) {
  const toast = useToast();

  const ChangeAgentStatus = async (): Promise<boolean> => {
    const statusChangeData = await providerSuperAgentListApiCalls.changeStatus(
      agent.id
    );
    if (statusChangeData.errorMessage) {
      toast({
        title: GENERAL_ERROR_MESSAGE,
        status: "error",
      });
      return false;
    } else {
      toast({
        title: "SuperAgent Status Updated Successfully",
        status: "success",
      });

      onUpdate(statusChangeData.data)
      return true;
    }
  };

  return (
    <ConfirmationDialogWithSwitch
      isChecked={agent.status == ActiveStatus.ACTIVE ? true : false}
      title={"Delete " + agent.firstName + " " + agent.lastName + "?"}
      message={`Are you sure you want to ${
        agent.status == ActiveStatus.ACTIVE ? "Disable" : "Activate"
      } this agent?`}
      onConfirm={() => ChangeAgentStatus()}
      confirmButtonLabel={`Yes ${
        agent.status == ActiveStatus.ACTIVE ? "Disable" : "Activate"
      }!`}
      cancelButtonLabel="No Close!"
      key={"delete-" + agent.id}
    
    />
  );
}

export default ChangeAgentStatus;
