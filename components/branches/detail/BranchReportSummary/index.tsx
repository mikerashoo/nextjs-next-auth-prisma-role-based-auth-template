/* eslint-disable react-hooks/rules-of-hooks */
import React from "react";

import {
  useBranchReportContext,
} from "@/contexts/branch-contexts/BranchReportContext";
import GeneralErrorComponent from "@/components/common/GeneralErrorComponent";
import BranchReportTicketTable from "./BranchReportTicketTable";
import BranchReportFilter from "./BranchReportFilter";
import BranchReportSummaryBox from "./BranchReportSummaryBox";

function BranchReportSummary() {
  const { report, loading, error, reload, onFilter, onFilterValuesChange } =
    useBranchReportContext();

  if (error) return <GeneralErrorComponent error={error} onTryAgain={reload} />;
  return (
    <div className="flex flex-col w-full gap-4 bg-slate-100 border shadow-sm h-full rounded-lg">
      <BranchReportFilter />
 
      <div className="flex flex-col md:flex-row gap-2 w-full p-2 h-full">
        <BranchReportSummaryBox />

        <BranchReportTicketTable />
      </div>
    </div>
  );
}

export default BranchReportSummary;
