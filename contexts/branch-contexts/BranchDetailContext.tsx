import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
  useCallback,
} from "react"; 
import { branchInformationApiService } from "@/backend-services/branches/information";
import { GENERAL_ERROR_MESSAGE } from "@/utils/constants"; 
import BranchReportSummary from "@/components/branches/detail/BranchReportSummary";
import { ChartBarIcon, UserGroupIcon } from "@heroicons/react/20/solid";
import { ITabContent } from "@/components/ui-components/AppTab";
import { IBranchWithDetail } from "@/utils/shared/shared-types/providerAndBranch";
import { BranchReportProvider } from "./BranchReportContext"; 
import PageLoading from "@/components/ui-components/PageLoading";
import BranchCashierList from "@/components/branches/detail/cashiers/BranchCashierList";

export interface IBranchDetailContext {
  loading: boolean;
  setLoading: (boolean) => void;
  selectedTab: number; 
  tabContents: ITabContent[];
  setSelectedTab: React.Dispatch<React.SetStateAction<number>>;
  error: string | null;
  reload: () => void;
  branch: IBranchWithDetail;
}

const BranchDetailContext = createContext<IBranchDetailContext | undefined>(
  undefined
);



export const BranchDetailProvider = ({
  children,
  branchIdentifier,
}: {
  children: ReactNode;
  branchIdentifier: string;
}) => {
  const [loading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [branch, setBranch] = useState<IBranchWithDetail>();
  const [selectedTab, setSelectedTab] = useState(0); 
 

  const fetchBranchDetail = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);

      const branchDetailData = await branchInformationApiService.detail(
        branchIdentifier
      );
      if (branchDetailData.errorMessage) {
        setError(branchDetailData.errorMessage);
        setIsLoading(false);
      }

      if (branchDetailData.data) {
        console.log("Fetch branches called", branchDetailData.data);

        setBranch(branchDetailData.data);
        setIsLoading(false);
      }
    } catch (error) {
      console.error("fetchGame on context catch error", error);

      setError(GENERAL_ERROR_MESSAGE + " white fetching branches");
    }
  }, [branchIdentifier]);

  useEffect(() => {
    fetchBranchDetail();
  }, [fetchBranchDetail]);

  const reload = () => {
    fetchBranchDetail();
  };



const tabContents = [
  {
    content: !branch ? <PageLoading /> :  <BranchReportProvider branchId={branch.id}> <BranchReportSummary /> </BranchReportProvider>,
    head: {
      label: "Ticket Report",
      icon:  <ChartBarIcon width={24} />
    },
    key: 'report'
  },
  {
    content: !branch ? <PageLoading /> : <BranchCashierList />,
    head: {
      label: "Cashier",
      icon:  <UserGroupIcon width={24} />
    },
    
    key: 'cashiers'
  },
  
]

  const providerData: IBranchDetailContext = {
    loading,
    error,
    reload,
    branch,
    tabContents,
    selectedTab,
    setSelectedTab,
    setLoading: setIsLoading,
  };

  return (
    <BranchDetailContext.Provider value={providerData}>
      {children}
    </BranchDetailContext.Provider>
  );
};

export const useBranchDetailContext = () => useContext(BranchDetailContext)!;
