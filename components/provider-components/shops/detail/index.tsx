import GeneralErrorComponent from "@/components/common/GeneralErrorComponent";
import PageLoading from "@/components/ui-components/PageLoading";
import { useShopDetailContext } from "@/contexts/shop-contexts/ShopDetailContext"; 
import { ShopCashiersProvider } from "@/contexts/shop-contexts/ShopCashierContext";
import AppTab, { ITabContent } from "@/components/ui-components/AppTab";
import { ShopReportProvider } from "@/contexts/shop-contexts/ShopReportContext";
import { InfoOutlineIcon } from "@chakra-ui/icons";
import { ChartBarIcon, UserGroupIcon } from "@heroicons/react/20/solid"; 
import ShopReportSummary from "./ShopReportSummary"; 
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import ShopCashierList from "./cashiers/shopCashierList";
import ShopProfile from "./ShopProfile";
 

export default function ShopDetailPage() {

  const { shop, loading, error } = useShopDetailContext();
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
      content: () => Promise.resolve({ default: () => <ShopProfile /> }),
      tabTitle: "Profile",
      pageTitle: `${shop.name} Profile`,
      icon: <InfoOutlineIcon width={24} />,
    },
    {
      content: () => Promise.resolve({
        default: () => (
          <ShopReportProvider shopId={shop.id}>
            <ShopReportSummary />
          </ShopReportProvider>
        ),
      }),
      tabTitle: "Cash Report",
      pageTitle: `${shop.name} Cash reports`,
      icon: <ChartBarIcon width={24} />,
    },
    {
      content: () => Promise.resolve({ default: () => <ShopCashierList /> }),
      pageTitle: `${shop.name} Cashiers`,
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
    <ShopCashiersProvider shopId={shop.id}>
      <div className="h-full w-screen lg:w-full flex flex-wrap flex-col">
        <AppTab
          tabContents={tabContents}
          isControlled={{
            currentIndex: selectedTab,
            setSelectedIndex: handleTabChange,
          }}
        />
      </div>
    </ShopCashiersProvider>
  );
}