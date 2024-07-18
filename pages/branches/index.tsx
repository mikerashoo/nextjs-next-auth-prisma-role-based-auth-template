import BranchHeader from "@/components/provider-components/branches/home/BranchHeader";
import BranchListTable from "@/components/provider-components/branches/home/BranchListTable";
import { PageLayout } from "@/components/layout/PageLayout";
import { BranchListProvider } from "@/contexts/branch-contexts/BranchIListContext";
import React, {  } from "react";

function Branches() {

  return (
    <BranchListProvider filterQuery={{}}>
    <PageLayout pageHeader={<BranchHeader   />}>
    <BranchListTable   />

    </PageLayout>
       
    </BranchListProvider>
  );
}

export default Branches;
