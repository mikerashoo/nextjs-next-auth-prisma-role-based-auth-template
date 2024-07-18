import { CommonReportProvider } from '@/contexts/ReportContext';
import React from 'react'
import CommonReportSummary from '../report-components/CommonReportSummary';
import { IBasicReportSchema } from '@/utils/shared/schemas/reportSchema';
import { ProviderReportApiCalls } from '@/backend-services/provider-api-calls/reports/provider-report-api-calls';

function ProviderHomeCashReport() {
 

  const filterApi = async (filter: IBasicReportSchema) => {
    return await ProviderReportApiCalls.cash({...filter});
  };
  return (
    <CommonReportProvider filterFunction={filterApi}>
      <CommonReportSummary noChart />
    </CommonReportProvider>
  );
  return (
    <div>ProviderHomeCashReport</div>
  )
}

export default ProviderHomeCashReport