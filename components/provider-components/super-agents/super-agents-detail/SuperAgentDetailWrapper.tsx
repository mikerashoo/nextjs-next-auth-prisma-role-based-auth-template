import React, { useEffect, useState } from "react";
import { UserGroupIcon, ChartBarIcon } from "@heroicons/react/20/solid";
import { Heading } from "@chakra-ui/react";
import { BranchesIcon } from "@/contexts/LayoutContext";
import AppTab from "@/components/ui-components/AppTab";
import { ISuperAgentInfo } from "@/utils/shared/shared-types/agentModels";
import { PageLayout } from "@/components/layout/PageLayout";
import ProviderSuperAgentHeader from "./ProviderSuperAgentHeader";
import { ProviderSuperAgentDetailProvider } from "@/contexts/super-agents/details/ProviderSuperAgentDetailContext";
import ProviderSuperAgentReport from "./ProviderSuperAgentReport";
import { BranchListProvider } from "@/contexts/branch-contexts/BranchIListContext";
import BranchListTable from "../../branches/home/BranchListTable";
import { getFullName } from "@/utils/common-hepers";
import AddBranchForm from "../../branches/home/AddBranchForm";
import PageHeading from "@/components/ui-components/PageHeading";
import { useRouter } from "next/router";

function SuperAgentDetailWrapper({
  superAgentDetail, 
}: {
  superAgentDetail: ISuperAgentInfo;
}) {

  const router = useRouter();
  const [selectedTab, setSelectedTab] = useState(0);

  useEffect(() => {
    const tabIndex = parseInt(router.query.tab as string);
    if (!isNaN(tabIndex) && tabIndex >= 0 && tabIndex < 3) { // Assuming 3 tabs
      setSelectedTab(tabIndex);
    }
  }, [router.query.tab]);

  return (
    <ProviderSuperAgentDetailProvider superAgent={superAgentDetail}>
      {/* <PageLayout pageHeader={<ProviderSuperAgentHeader />}> */}
        <AppTab
          tabContents={[
            {
              pageTitle: `${getFullName(superAgentDetail)} Cash Report`,
              tabTitle: "Reports",
              icon: <ChartBarIcon width={24} />,
              content: () => Promise.resolve({ default: () => <ProviderSuperAgentReport /> }), 
            },
            {
             
              tabTitle: "Branches",
              icon: <BranchesIcon />,
              content: () => Promise.resolve({ default: () => <SuperAgentBranchListWrapper superAgentDetail={superAgentDetail} /> }), 
               
            },
            {
              tabTitle: "Agents",
              pageTitle: `${getFullName(superAgentDetail)} Agents`,

              icon: <UserGroupIcon width={24} />,
              content: () => Promise.resolve({ default: () => <div ></div> }), 
 
            },
          ]}
        />
      {/* </PageLayout> */}
    </ProviderSuperAgentDetailProvider>
  );
}
 
function SuperAgentBranchListWrapper({
  superAgentDetail,
}: {
  superAgentDetail: ISuperAgentInfo;
}) {
  return (
    <BranchListProvider filterQuery={{superAgentId: superAgentDetail.id}}>
      <PageHeading title={`${getFullName(superAgentDetail)} Branches`} action={<AddBranchForm />} />
                <BranchListTable />
              </BranchListProvider>
  )
}
 
export default SuperAgentDetailWrapper;
