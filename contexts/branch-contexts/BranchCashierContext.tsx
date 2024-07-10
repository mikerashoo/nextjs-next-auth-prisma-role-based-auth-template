import React, {
    createContext,
    useContext,
    useEffect,
    useState,
    ReactNode,
    useCallback,
  } from "react"; 
  import { GENERAL_ERROR_MESSAGE } from "@/utils/constants";
import { IDBCashier } from "@/utils/shared/shared-types/prisma-models";  
import { branchInformationApiService } from "@/backend-services/branches/information";

  
  export interface IBranchCashiersContext {
    loading: boolean;
    setLoading: (loading: boolean) => void;
    branchId: string;
    error: string | null;
    reload: () => void;
    cashiers: IDBCashier[];
    onUpdate: (cashier: IDBCashier) => void;
    onDelete: (cashierId: string) => void;
  }
  
  const BranchCashiersContext = createContext<IBranchCashiersContext | undefined>(
    undefined
  );
  
  export const BranchCashiersProvider = ({
    children,
    branchId,
  }: {
    children: ReactNode;
    branchId: string;
  }) => {
    const [loading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [cashiers, setCashiers] = useState<IDBCashier[]>();
  
    const fetchBranchCashiers = useCallback(async () => {
      try {
        setIsLoading(true);
        setError(null);
  
        const branchCashier = await branchInformationApiService.cashiers(
          branchId
        );
        if (branchCashier.errorMessage) {
          setError(branchCashier.errorMessage);
          setIsLoading(false);
        }
  
        if (branchCashier.data) {
          console.log("Fetch branches called", branchCashier.data);
  
          setCashiers(branchCashier.data);
          setIsLoading(false);
        }
      } catch (error) {
        console.error("fetchGame on context catch error", error);
  
        setError(GENERAL_ERROR_MESSAGE + " white fetching branches");
      }
    }, [branchId]);
  
    useEffect(() => {
      fetchBranchCashiers();
    }, [fetchBranchCashiers]);
  
    const reload = () => {
      fetchBranchCashiers();
    };
    

    const onUpdate = (cashier: IDBCashier) => {
      const newData = cashiers.map(pCashier => pCashier.id == cashier.id ? cashier : pCashier);
      setCashiers(newData);
    };

    const onDelete = (cashierId: string) => { 
      const newData = cashiers.filter(pCashier => pCashier.id != cashierId);
      console.log("New Data", cashierId)
      setCashiers(newData);
    };

    const providerData: IBranchCashiersContext = {
      loading,
      error,
      branchId,
      reload,
      onDelete,
      onUpdate,
      cashiers,
      setLoading: setIsLoading,
    };
  
    return (
      <BranchCashiersContext.Provider value={providerData}>
        {children}
      </BranchCashiersContext.Provider>
    );
  };
  
  export const useBranchCashiersContext = () => useContext(BranchCashiersContext)!;
  