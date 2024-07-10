import GeneralErrorComponent from "@/components/common/GeneralErrorComponent";
import PageLoading from "@/components/ui-components/PageLoading";
import { useBranchDetailContext } from "@/contexts/branch-contexts/BranchDetailContext";
import React from "react";
import BranchDetailHeader from "./BranchDetailHeader";
// import { Tabs, TabList, Tab, TabPanels, TabPanel } from "@chakra-ui/react";
import { BranchCashiersProvider } from "@/contexts/branch-contexts/BranchCashierContext";
import AppTab from "@/components/ui-components/AppTab";

function BranchDetailHome() {
  const {
    branch,
    loading,
    error,
    reload,
    tabContents,
    selectedTab,
    setSelectedTab,
  } = useBranchDetailContext();

  if (loading) return <PageLoading />;
  if (error) return <GeneralErrorComponent error={error} onTryAgain={reload} />;
  return (
    <BranchCashiersProvider branchId={branch.id}>
      <div className="h-full  w-screen lg:w-full flex flex-wrap   flex-col">
        <BranchDetailHeader />

        <span className="px-1 py-2 w-full">
          <AppTab
            isControlled={{
              currentIndex: selectedTab,
              setSelectedIndex: setSelectedTab,
            }}
            tabContents={tabContents}
          />
        </span>
      </div>
    </BranchCashiersProvider>
  );
}

export default BranchDetailHome;
