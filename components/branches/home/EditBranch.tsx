import { branchInformationApiService } from "@/backend-services/branches/information";
import {
  IBranchUpdateSchema,
  branchUpdateSchema,
} from "@/utils/shared/schemas/provider/branch-information-schema";
import { IDBBranch } from "@/utils/shared/shared-types/prisma-models";
import { InfoOutlineIcon } from "@chakra-ui/icons";
import { useToast } from "@chakra-ui/react";
import { useState } from "react";
import { HeadlessButton } from "../../ui-components/AppButton";
import AppModal from "../../ui-components/modals/AppModal";
import AppForm from "../../ui-components/forms/AppForm";
import { InputType } from "../../ui-components/forms/app-form-types-helpers";
import { ActiveStatus } from "@/lib/enums";
import { useBranchListContext } from "@/contexts/branch-contexts/BranchIListContext";

export default function EditBranch({
  branch, 
}: {
  branch: IDBBranch; 
}) {

  const {setLoading, error, loading, reload} = useBranchListContext();
 
  const [hideModal, setHideModal] = useState<boolean>(true);

  const toast = useToast();
  async function onSubmit(data: IBranchUpdateSchema) {
    // setLoading(true);
    const success = await branchInformationApiService.update(branch.id, data);

    if (success.data) {
    console.log("Submit", success)

      toast({
        status: "success",
        position: "top",
        title: "Branch Updated Successfully",
      });
      setLoading(false);

      setHideModal(true);
      reload()
    }
    
    setLoading(false);

    return success;
  }

  return (
    <AppModal
      hideModal={hideModal}
      loading={loading}
      title={"Edit " + branch.name}
      toggleButton={
        <HeadlessButton editButton>
          <InfoOutlineIcon /> Edit
        </HeadlessButton>
      }
    >
      <AppForm
        submitButtonLabel={"Update " + branch.name}
        formSchema={{
          inputs: [
            {
              label: "Branch Name",
              name: "name",
              inputType: InputType.Text,
            },
            {
              label: "Branch Address",
              name: "address",
              inputType: InputType.Text,
            },
            {
              label: "Status",
              name: "status",
              inputType: InputType.Radio,
              options: [
                {
                  label: "Active",
                  value: ActiveStatus.ACTIVE,
                  customProps: { 
                    colorScheme: "teal",
                  },
                },
                {
                  label: "In Active",
                  value: ActiveStatus.IN_ACTIVE,
                  customProps: { 
                    colorScheme: "red", 
                  },
                },
              ],
            },
          ],
          schema: branchUpdateSchema,
        }}
        //   const options = Object.values(schema.shape[name]._def.schema._def.innerType._def.values) as string[];

        defaultValues={{
          name: branch.name,
          address: branch.address,
          status: branch.status,
        }}
        submitFunction={onSubmit}
      />
    </AppModal>
  );
}
