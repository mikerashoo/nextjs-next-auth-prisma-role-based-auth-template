import GeneralErrorComponent from "@/components/common/GeneralErrorComponent";
import PageLoading from "@/components/ui-components/PageLoading";
import { useBranchDetailContext } from "@/contexts/branch-contexts/BranchDetailContext";
import React, { useEffect, useState } from "react";
import BranchDetailHeader from "./BranchDetailHeader";
// import { Tabs, TabList, Tab, TabPanels, TabPanel } from "@chakra-ui/react";
import { BranchCashiersProvider } from "@/contexts/branch-contexts/BranchCashierContext";
import AppTab, { ITabContent } from "@/components/ui-components/AppTab";
import { BranchReportProvider } from "@/contexts/branch-contexts/BranchReportContext";
import { InfoOutlineIcon } from "@chakra-ui/icons";
import { ChartBarIcon, UserGroupIcon } from "@heroicons/react/20/solid";
import BranchProfile from "./BranchProfile";
import BranchReportSummary from "./BranchReportSummary";
import BranchCashierList from "./cashiers/BranchCashierList";
import { useRouter } from "next/router";
 

export default function BranchDetailPage() {

  const { branch, loading, error } = useBranchDetailContext();
  const router = useRouter();
  const [selectedTab, setSelectedTab] = useState(0);

  useEffect(() => {
    const tabIndex = parseInt(router.query.tab as string);
    if (!isNaN(tabIndex) && tabIndex >= 0 && tabIndex < 3) { // Assuming 3 tabs
      setSelectedTab(tabIndex);
    }
  }, [router.query.tab]);

  if(loading) return <PageLoading />
  if(error) return <GeneralErrorComponent error={error} />

  const tabContents: ITabContent[] = loading ? [] : [
    {
      content: () => Promise.resolve({ default: () => <BranchProfile /> }),
      tabTitle: "Profile",
      pageTitle: `${branch.name} Profile`,
      icon: <InfoOutlineIcon width={24} />,
    },
    {
      content: () => Promise.resolve({
        default: () => (
          <BranchReportProvider branchId={branch.id}>
            <BranchReportSummary />
          </BranchReportProvider>
        ),
      }),
      tabTitle: "Cash Report",
      pageTitle: `${branch.name} Cash reports`,
      icon: <ChartBarIcon width={24} />,
    },
    {
      content: () => Promise.resolve({ default: () => <BranchCashierList /> }),
      pageTitle: `${branch.name} Cashiers`,
      tabTitle: "Cashiers",
      icon: <UserGroupIcon width={24} />,
    },
  ];

  const handleTabChange = (index: number) => {
    setSelectedTab(index);
    router.push({
      pathname: router.pathname,
      query: { ...router.query, tab: index },
    }, undefined, { shallow: true });
  };

  return (
    <BranchCashiersProvider branchId={branch.id}>
      <div className="h-full w-screen lg:w-full flex flex-wrap flex-col">
        <AppTab
          tabContents={tabContents}
          isControlled={{
            currentIndex: selectedTab,
            setSelectedIndex: handleTabChange,
          }}
        />
      </div>
    </BranchCashiersProvider>
  );
}