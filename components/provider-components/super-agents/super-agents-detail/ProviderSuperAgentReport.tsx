import { providerSuperAgentListApiCalls } from "@/backend-services/provider-api-calls/super-agent-management/super-agent-list-api-calls";
import { CommonReportProvider } from "@/contexts/ReportContext";
import { useProviderSuperAgentDetailContext } from "@/contexts/super-agents/details/ProviderSuperAgentDetailContext";
import React from "react"; 
import CommonReportSummary from "../../report-components/CommonReportSummary";
import { IBasicReportSchema } from "@/utils/shared/schemas/reportSchema";
import { ProviderReportApiCalls } from "@/backend-services/provider-api-calls/reports/provider-report-api-calls";

function ProviderSuperAgentReport() {
  const { profile } = useProviderSuperAgentDetailContext();

  const filterApi = async (filter: IBasicReportSchema) => {
    return await ProviderReportApiCalls.cash({...filter, superAgentId: profile.id});
  };
  return (
    <CommonReportProvider filterFunction={filterApi}>
      <CommonReportSummary />
    </CommonReportProvider>
  );
}

export default ProviderSuperAgentReport;
