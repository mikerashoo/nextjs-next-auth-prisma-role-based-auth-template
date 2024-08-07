import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
  useCallback,
} from "react";
import { GENERAL_ERROR_MESSAGE } from "@/utils/constants";
import { ICashierReport } from "@/utils/shared/shared-types/gameModels";
import {
  formatDateForFilter,
  getFilterStartEndFromPeriod,
  now,
} from "@/utils/common-hepers/date-time-helpers";
import { shopInformationApiService } from "@/backend-services/provider-api-calls/shops/information";
import { GameType, TicketStatus } from "@/utils/shared/shared-types/prisma-enums";
import {
  IFilterDateRanges,
  PeriodTodayDateRanges,
  filterPeriods,
} from "@/utils/report-hepers"; 
import { ITicketReportFilterSchema } from "@/utils/shared/schemas/reportSchema";

interface IReportFilterForShopTicket {
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
  startAndEd?: IFilterDateRanges,  cashierId?: string, gameType?: GameType
}

export interface IShopReportContext {
  loading: boolean;
  setLoading: (loading: boolean) => void;
  shopId: string;
  error: string | null;
  reload: () => void;

  report: ICashierReport;

  filterLabel: string;
  onFilterValuesChange: (values: IReportFilterProps) => void;

  onFilter: () => void;
  currentStartEnd: IFilterDateRanges;
  currentFilter: {
    period: string;
    cashier?: string;
    gameType?: string;
  };
}

const ShopReportContext = createContext<IShopReportContext | undefined>(
  undefined
);

export const ShopReportProvider = ({
  children,
  shopId,
}: {
  children: ReactNode;
  shopId: string;
}) => {
  const [loading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [report, setReport] = useState<ICashierReport>({
    remainingCash: 0,
    totalMoneyCollected: 0,
    totalMoneyPaid: 0,
    totalTickets: 0,
    tickets: [],
    totalTicketsCancelled: 0,
    totalMoneyToBePaid: 0,
  });

  const [filter, setFilter] = useState<ITicketReportFilterSchema>({
    startAt: formatDateForFilter(now),
    endAt: formatDateForFilter(now),
    shopIds: [shopId],
    cashierIds: null,
    gameTypes: null,
  });

  const [filterChanges, setChangesToFilter] =
    useState<IReportFilterForShopTicket>({
      cashierId: null,
      gameType: null,
      dateRanges: PeriodTodayDateRanges,
    });

  // const _selectedFilterObject = filterPeriods.find(
  //   (fP) => fP.value == selectedPeriod
  // );

  const fetchReport = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);

      const todayTicketsData = await shopInformationApiService.report(filter);

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
  }, [filter]);

  useEffect(() => {
    fetchReport();
  }, [fetchReport]);

  const onFilter = () => {
    const newFilter = {
      startAt: formatDateForFilter(filterChanges.dateRanges.start),
      endAt: formatDateForFilter(filterChanges.dateRanges.end),
      shopIds: [shopId],
      cashierIds: filterChanges.cashierId ? [filterChanges.cashierId] : [],
      gameTypes: filterChanges.gameType ? [filterChanges.gameType] : [],
    }
    console.log("e Filtered", filterChanges);
    console.log("To Be Filtered", newFilter); 
    setFilter(newFilter);
  };

  const onFilterValuesChange = ({startAndEd, cashierId, gameType} : IReportFilterProps) => { 
    let newFilter: ITicketReportFilterSchema = {
      ...filter, 
      startAt: startAndEd ? formatDateForFilter(startAndEd.start) : filter.startAt,
      endAt: startAndEd ? formatDateForFilter(startAndEd.end) : filter.endAt,
      cashierIds: cashierId ? [cashierId] : filter.cashierIds,
      gameTypes: gameType ? [gameType] : filter.gameTypes,
    };
 
    setFilter(newFilter);

    
  };

  const getFilterLabel = (): {
    period: string;
    cashier?: string;
    gameType?: string;
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
  
    let gameType =
      filter.gameTypes && filter.gameTypes.length > 0
        ? filter.gameTypes[0]
        : null;
  
    let cashier =
      filter.cashierIds && filter.cashierIds.length > 0
        ? filter.cashierIds[0]
        : null;
  
    return {
      period,
      cashier,
      gameType,
    };
  };
  const providerData: IShopReportContext = {
    loading,
    error,
    shopId,
    reload: fetchReport,
    report,
    setLoading: setIsLoading,
    filterLabel: "",
    onFilterValuesChange,
    currentStartEnd: filterChanges.dateRanges,
    currentFilter: getFilterLabel(),
    onFilter,
  };

  // console.log("New FIler Labe", filter.cashierIds);

  return (
    <ShopReportContext.Provider value={providerData}>
      {children}
    </ShopReportContext.Provider>
  );
};

export const useShopReportContext = () => useContext(ShopReportContext)!;
