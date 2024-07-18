/* eslint-disable react-hooks/rules-of-hooks */
import React from "react";

import {
  useBranchReportContext,
} from "@/contexts/branch-contexts/BranchReportContext";
import GeneralErrorComponent from "@/components/common/GeneralErrorComponent";
import BranchReportTicketTable from "./BranchReportTicketTable";
import BranchReportFilter from "./BranchReportFilter";
import BranchReportSummaryBox from "./BranchReportSummaryBox";
import { useBranchDetailContext } from "@/contexts/branch-contexts/BranchDetailContext";
import { ProviderReportApiCalls } from "@/backend-services/provider-api-calls/reports/provider-report-api-calls";
import CommonReportSummary from "@/components/provider-components/report-components/CommonReportSummary";
import { CommonReportProvider } from "@/contexts/ReportContext";
import { IBasicReportSchema } from "@/utils/shared/schemas/reportSchema"; 

function BranchReportSummary() {
  const { report, loading, error, reload, onFilter, onFilterValuesChange } =
    useBranchReportContext();

  const { branch  } = useBranchDetailContext();


  if (error) return <GeneralErrorComponent error={error} onTryAgain={reload} />;


  const filterApi = async (filter: IBasicReportSchema) => {
    return await ProviderReportApiCalls.cash({...filter, branchId: branch.id});
  };
  return (
    <CommonReportProvider filterFunction={filterApi}>
      <CommonReportSummary />
    </CommonReportProvider>
  ); 
}




export default BranchReportSummary;
