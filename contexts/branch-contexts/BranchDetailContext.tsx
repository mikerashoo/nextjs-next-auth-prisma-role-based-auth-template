import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
  useCallback,
} from "react";
import { branchInformationApiService } from "@/backend-services/provider-api-calls/branches/information";
import { GENERAL_ERROR_MESSAGE } from "@/utils/constants";
import { IBranchWithDetail } from "@/utils/shared/shared-types/providerAndBranch";

export interface IBranchDetailContext {
  loading: boolean;
  setLoading: (boolean) => void;
  selectedTab: number; 
  setSelectedTab: React.Dispatch<React.SetStateAction<number>>;
  error: string | null;
  reload: () => void;
  onUpdate: (data:  IBranchWithDetail) => void;
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
 
  const onUpdate = (profile: IBranchWithDetail) => {
    setBranch({
      ...branch,
      ...profile
    })
  }

  const providerData: IBranchDetailContext = {
    loading,
    error,
    reload,
    branch, 
    selectedTab,
    setSelectedTab,
    onUpdate,
    setLoading: setIsLoading,
  };

  return (
    <BranchDetailContext.Provider value={providerData}>
      {children}
    </BranchDetailContext.Provider>
  );
};

export const useBranchDetailContext = () => useContext(BranchDetailContext)!;
