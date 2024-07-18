 
import { PageLayout } from "@/components/layout/PageLayout";
import ShopHeader from "@/components/provider-components/shops/home/shopHeader";
import ShopListTable from "@/components/provider-components/shops/home/shopListTable";
import { ShopListProvider } from "@/contexts/shop-contexts/ShopIListContext";
import React, {  } from "react";

function Shops() {

  return (
    <ShopListProvider filterQuery={{}}>
    <PageLayout pageHeader={<ShopHeader   />}>
    <ShopListTable   />

    </PageLayout>
       
    </ShopListProvider>
  );
}

export default Shops;
