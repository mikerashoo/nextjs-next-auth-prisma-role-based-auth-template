import { branchInformationApiService } from "@/backend-services/provider-api-calls/branches/information";
import LabelValueCard from "@/components/ui-components/LabelValueCard";
import { ConfirmationDialog } from "@/components/ui-components/modals/ConfirmationDialog";
import { useBranchDetailContext } from "@/contexts/branch-contexts/BranchDetailContext";
import { GENERAL_ERROR_MESSAGE } from "@/utils/constants";
import { Heading, HStack, useToast } from "@chakra-ui/react"; 
import React from "react";
import EditBranch from "../home/EditBranch"; 
import StatusIcon from "@/components/ui-components/StatusIcon";
import { ActiveStatus, UserRole } from "@/utils/shared/shared-types/prisma-enums"; 
import { getFullName, getFullNameForAgent } from "@/utils/common-hepers";
import { IconName } from "@/components/ui-components/AppIcon/icon-list"; 
import AppIcon from "@/components/ui-components/AppIcon/CommonIcon";
import { useRouter } from "next/router";
function BranchProfile() {
  const { branch, loading, reload } = useBranchDetailContext();
  const toast = useToast();
  const { name, address, status, agent, createdAt, id } = branch;

  const router = useRouter();

  const deleteBranch = async (): Promise<boolean> => {
    const deleteData = await branchInformationApiService.delete(id);
    if (deleteData.errorMessage) {
      toast({
        title: GENERAL_ERROR_MESSAGE,
        status: "error",
      });
      return false;
    } else {
      toast({
        title: "Branch Deleted Successfully",
        status: "success",
      });

      router.back()
      
      return deleteData.data;
    }
  };

  const confirmDelete = (
    <ConfirmationDialog
      openButtonLabel={
        <>
          {" "}
          <AppIcon name={IconName.Trash2} /> Delete{" "}
        </>
      }
      title={"Delete " + name + "?"}
      message="Are you sure you want to delete this branch?"
      onConfirm={() => deleteBranch()}
      confirmButtonLabel="Yes Delete!"
      cancelButtonLabel="No Close!"
    />
  );
  return (
    <div className="flex flex-col gap-2">
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex flex-col justify-start gap-2  bg-white  border p-4 w-full">
          <Heading className="pb-2 border-b-2" size={"md"} mb={2}>
            Basic Profile
          </Heading>

          <LabelValueCard label={"Name"} iconName={IconName.UserPen} value={name} />
          <LabelValueCard
            label={"Address"}
            iconName={IconName.MapPin}
            value={address}
          />
          <LabelValueCard
            label={"Status"}
            iconName={IconName.Sun}
            value={<StatusIcon isActive={status == ActiveStatus.ACTIVE} />}
          />
          <LabelValueCard
            label={"Added At"}
            iconName={IconName.Calendar}
            value={new Date(createdAt).toLocaleDateString()}
          />
          <HStack>
            <EditBranch branch={branch} />

            {confirmDelete}
          </HStack>
        </div>

        <div className="flex flex-col justify-start gap-2  bg-white  border p-4 w-full">
          <Heading size={"md"} className="pb-2 border-b-2" mb={2}>
            Agent / Super Agent 🔥
          </Heading>

         
              <LabelValueCard
                label={"Agent"}
                iconName={IconName.UserPen}
                value={
                  agent ? (
                    getFullName(agent)
                  ) : (
                    <span className="text-orange-400 text-sm">
                      {" "}
                      Not Assigned{" "}
                    </span>
                  )
                }
              />
              <LabelValueCard
                label={"Super Agent"}
                iconName={IconName.MapPin}
                value={
                  agent && agent.superAgent ? (
                    getFullName(agent.superAgent)
                  ) : agent.role == UserRole.SUPER_AGENT ? getFullNameForAgent(agent) : (
                    <span className="text-orange-400 text-sm">
                      {" "}
                      Not Assigned{" "}
                    </span>
                  )
                }
              />
              {
                agent ? (
                  <div className="flex flex-col md:flex-row gap-2 items-center">
               

                <button className="flex items-center justify-center w-full md:w-1/2 px-5 py-2 text-sm tracking-wide text-white transition-colors duration-200 bg-orange-500 rounded-lg shrink-0 sm:w-auto gap-x-2 hover:bg-orange-600 dark:hover:bg-orange-500 dark:bg-teal-600">
                <AppIcon name={IconName.Recycle} />
                
                Remove / Assign To Other
                </button>
              </div>
                ) : (

                <button className="flex items-center justify-center w-fit px-5 py-2 text-sm tracking-wide text-white transition-colors duration-200 bg-teal-500 rounded-lg shrink-0 gap-x-2 hover:bg-teal-600 dark:hover:bg-teal-500 dark:bg-teal-600">
               <AppIcon name={IconName.UserPlus} />
                Assign Agent
              </button>
                )
              }
            
          
        </div>
      </div>
    </div>
  );
}

export default BranchProfile;
