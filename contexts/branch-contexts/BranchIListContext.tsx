import { branchInformationApiService } from "@/backend-services/branches/information";
import { GENERAL_ERROR_MESSAGE } from "@/utils/constants";
import { IDBBranch } from "@/utils/shared/shared-types/prisma-models";
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
  branches: IDBBranch[]

}

const BranchListContext = createContext<IBranchListContext | undefined>(
  undefined
);

export const BranchListProvider = ({
  children,
}: {
  children: ReactNode; 
}) => { 
  const [loading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [branches, setBranches] = useState<IDBBranch[]>([]);

 
  const fetchBranches = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);

      const branchListData = await branchInformationApiService.list();
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
  }, []);

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
    setLoading: setIsLoading
  };

  return (
    <BranchListContext.Provider value={providerData}>
      {children}
    </BranchListContext.Provider>
  );
};

export const useBranchListContext = () => useContext(BranchListContext)!;
