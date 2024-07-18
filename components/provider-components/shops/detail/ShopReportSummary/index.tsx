/* eslint-disable react-hooks/rules-of-hooks */
import React from "react";

import {
  useShopReportContext,
} from "@/contexts/shop-contexts/ShopReportContext";
import GeneralErrorComponent from "@/components/common/GeneralErrorComponent";
import { useShopDetailContext } from "@/contexts/shop-contexts/ShopDetailContext";
import { ProviderReportApiCalls } from "@/backend-services/provider-api-calls/reports/provider-report-api-calls";
import CommonReportSummary from "@/components/provider-components/report-components/CommonReportSummary";
import { CommonReportProvider } from "@/contexts/ReportContext";
import { IBasicReportSchema } from "@/utils/shared/schemas/reportSchema"; 

function ShopReportSummary() {
  const { report, loading, error, reload, onFilter, onFilterValuesChange } =
    useShopReportContext();

  const { shop  } = useShopDetailContext();


  if (error) return <GeneralErrorComponent error={error} onTryAgain={reload} />;


  const filterApi = async (filter: IBasicReportSchema) => {
    return await ProviderReportApiCalls.cash({...filter, shopId: shop.id});
  };
  return (
    <CommonReportProvider filterFunction={filterApi}>
      <CommonReportSummary />
    </CommonReportProvider>
  ); 
}




export default ShopReportSummary;
