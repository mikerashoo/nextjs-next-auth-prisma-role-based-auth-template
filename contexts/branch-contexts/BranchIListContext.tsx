import { branchInformationApiService } from "@/backend-services/provider-api-calls/branches/information";
import { GENERAL_ERROR_MESSAGE } from "@/utils/constants";
import { IProviderCommonQuerySchema } from "@/utils/shared/schemas/reportSchema"; 
import { IBranchWithDetail } from "@/utils/shared/shared-types/providerAndBranch";
import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
  useCallback,
} from "react"; 

export interface IBranchListContext { 
  loading: boolean;
  setLoading: (boolean) => void;
  error: string | null;  
  reload: () => void;  
  branches: IBranchWithDetail[] 
  filterQuery?: IProviderCommonQuerySchema
}



const BranchListContext = createContext<IBranchListContext | undefined>(
  undefined
);

export const BranchListProvider = ({
  children,
  filterQuery
}: {
  children: ReactNode; 
  filterQuery?: IProviderCommonQuerySchema
}) => { 
  const [loading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [branches, setBranches] = useState<IBranchWithDetail[]>([]);

 
  const fetchBranches = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);

      const branchListData = await branchInformationApiService.list(filterQuery);
      if (branchListData.errorMessage) {
        setError(branchListData.errorMessage);
        setIsLoading(false);
      }

      if (branchListData.data) { 
          console.log("Fetch branches called", branchListData.data);

          setBranches(branchListData.data);
          setIsLoading(false); 
      }
    } catch (error) {
      console.error("fetchGame on context catch error", error);

      setError(GENERAL_ERROR_MESSAGE + " white fetching branches");
    }
  }, [filterQuery]);

  useEffect(() => {
    fetchBranches();
  }, [fetchBranches]);
 
  const reload = () => {
    fetchBranches()
  };
 

  const providerData: IBranchListContext = {
    loading,
    error, 
    reload,  
    branches,
    filterQuery,
    setLoading: setIsLoading
  };

  return (
    <BranchListContext.Provider value={providerData}>
      {children}
    </BranchListContext.Provider>
  );
};

export const useBranchListContext = () => useContext(BranchListContext)!;
