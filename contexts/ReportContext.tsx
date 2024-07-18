import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
  useCallback,
} from "react";
import {
  formatDateForFilter,
  now,
} from "@/utils/common-hepers/date-time-helpers";
import { GameType } from "@/utils/shared/shared-types/prisma-enums";
import {
  IFilterDateRanges,
  PeriodTodayDateRanges,
  filterPeriods,
} from "@/utils/report-hepers"; 
import { branchInformationApiService } from "@/backend-services/provider-api-calls/branches/information";
import { GENERAL_ERROR_MESSAGE } from "@/utils/constants";
import { ICallAPiResponse } from "@/lib/callAPi";
import { ICommonReport } from "@/utils/shared/shared-types/reportModels";
import { IBasicReportSchema } from "@/utils/shared/schemas/reportSchema";

interface IReportFilterProps {
  dateRanges?: IFilterDateRanges;
  cashierId?: string;
  gameType?: GameType;
}

export enum FilterChangeOption {
  DATE_RANGES = "dateRanges",
  CASHIER_ID = "cashierId",
  GAME_TYPE = "gameType",
}

interface IReportFilterProps {
  startAndEd?: IFilterDateRanges;
  cashierId?: string;
  gameType?: GameType;
}

export interface ICommonReportContext {
  loading: boolean;
  setLoading: (loading: boolean) => void;
  error: string | null; 

  report: ICommonReport;
  setReport: (report: ICommonReport) => void;
  reload: () => void;
 
  onPeriodChange: (values: IFilterDateRanges) => void;
 
}

const CommonReportContext = createContext<ICommonReportContext | undefined>(
  undefined
);

interface ICommonReportProviderProps {
  children: ReactNode;
  filterFunction: (filter: IBasicReportSchema) => Promise<ICallAPiResponse<ICommonReport>>;
}

export const CommonReportProvider = ({
  children,
  filterFunction,
}: ICommonReportProviderProps) => {
  const [report, setReport] = useState<ICommonReport>({
    cash: {
      remainingCash: 0,
      totalMoneyCollected: 0,
      totalMoneyPaid: 0,
      totalMoneyToBePaid: 0,
      netCash: 0,
    },
    ticket: {
      activeCount: 0,
      cancelledCount: 0,
      loserCount: 0,
      paidCount: 0,
      totalCount: 0,
      winnerCount: 0,
    },
  });

  const [loading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [filter, setFilter] = useState<IBasicReportSchema>({
    startAt: formatDateForFilter(now),
    endAt: formatDateForFilter(now),
  });

  

  const onPeriodChange = ({ start, end }: IFilterDateRanges) => {
    let newFilter: IBasicReportSchema = { 
      startAt: formatDateForFilter(start),
      endAt: formatDateForFilter(end),
    };

    setFilter(newFilter);
  };

  useEffect(() => {

  const fetchReport = async (filter) => {
    try {
      setIsLoading(true);
      setError(null);

      const todayTicketsData = await filterFunction(filter);

      console.log("Filte rfilt", filter);

      if (todayTicketsData.errorMessage) {
        setError(todayTicketsData.errorMessage);
      } else {
        setReport(todayTicketsData.data);
      }

      setIsLoading(false);
    } catch (error) {
      console.log("Fetching tickets error", error);
      setError(GENERAL_ERROR_MESSAGE);
      setIsLoading(false);
    }
  };

    fetchReport(filter);
  }, [filter, filterFunction]);

  // useEffect(() => {
  //  filterFunction(filter)
  // }, [filter, filterFunction])

  const getFilterLabel = (): {
    period: string;
  } => {
    const startDate = new Date(filter.startAt);
    const endDate = new Date(filter.endAt);

    const _periodExists = filterPeriods.find(
      (per) =>
        per.value !== "custom" &&
        per.startDate?.toDateString() === startDate.toDateString() &&
        per.endDate?.toDateString() === endDate.toDateString()
    );

    let period = _periodExists
      ? _periodExists.label
      : `${filter.startAt} - ${filter.endAt}`;

    return {
      period,
    };
  };
  const providerData: ICommonReportContext = {
    loading,
    setLoading: setIsLoading,
    error,

    setReport,
    onPeriodChange, 
    reload: () => filterFunction(filter),
    report,
  };

  // console.log("New FIler Labe", filter.cashierIds);

  return (
    <CommonReportContext.Provider value={providerData}>
      {children}
    </CommonReportContext.Provider>
  );
};

export const useCommonReportContext = () => useContext(CommonReportContext)!;
