import React from "react";
import PageHeader from "../../ui-components/PageHeader";
import { ActiveStatus } from "@/lib/enums";
import { StarIcon, LockIcon } from "@chakra-ui/icons";
import { ArrowTrendingUpIcon } from "@heroicons/react/20/solid";
import { useBranchListContext } from "@/contexts/branch-contexts/BranchIListContext";
import AddBranchForm from "./AddBranchForm";
import { useBranchDetailContext } from "@/contexts/branch-contexts/BranchDetailContext";

interface IBranchHeaderProps {
   
}

export default function BranchHeader({
 
}: IBranchHeaderProps) {

  const {branches, error, loading, reload} = useBranchListContext();
  
  return (
    <PageHeader
      title={"Branches"}
      statics={[
        {
          label: branches.length + " Total branches",
          icon: <ArrowTrendingUpIcon width={16} />,
        },
        {
          label:
            branches.filter((br) => br.status == ActiveStatus.ACTIVE).length +
            " Active branches",
          icon: <StarIcon />,
        },

        {
          label:
            branches.filter((br) => br.status == ActiveStatus.IN_ACTIVE)
              .length + " Deactivated branches",
          icon: <LockIcon />,
        },
      ]}
      actions={[!error && !loading && <AddBranchForm key={"add"} />]}
    />
  );
}
 
