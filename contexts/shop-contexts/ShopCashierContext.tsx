import React, {
    createContext,
    useContext,
    useEffect,
    useState,
    ReactNode,
    useCallback,
  } from "react"; 
  import { GENERAL_ERROR_MESSAGE } from "@/utils/constants"; 
import { shopInformationApiService } from "@/backend-services/provider-api-calls/shops/information";
import { IUser } from "@/utils/shared/shared-types/userModels";

  
  export interface IShopCashiersContext {
    loading: boolean;
    setLoading: (loading: boolean) => void;
    shopId: string;
    error: string | null;
    reload: () => void;
    cashiers: IUser[];
    onUpdate: (cashier: IUser) => void;
    onDelete: (cashierId: string) => void;
  }
  
  const ShopCashiersContext = createContext<IShopCashiersContext | undefined>(
    undefined
  );
  
  export const ShopCashiersProvider = ({
    children,
    shopId,
  }: {
    children: ReactNode;
    shopId: string;
  }) => {
    const [loading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [cashiers, setCashiers] = useState<IUser[]>();
  
    const fetchShopCashiers = useCallback(async () => {
      try {
        setIsLoading(true);
        setError(null);
  
        const shopCashier = await shopInformationApiService.cashiers(
          shopId
        );
        if (shopCashier.errorMessage) {
          setError(shopCashier.errorMessage);
          setIsLoading(false);
        }
  
        if (shopCashier.data) {
          console.log("Fetch shops called", shopCashier.data);
  
          setCashiers(shopCashier.data);
          setIsLoading(false);
        }
      } catch (error) {
        console.error("fetchGame on context catch error", error);
  
        setError(GENERAL_ERROR_MESSAGE + " white fetching shops");
      }
    }, [shopId]);
  
    useEffect(() => {
      fetchShopCashiers();
    }, [fetchShopCashiers]);
  
    const reload = () => {
      fetchShopCashiers();
    };
    

    const onUpdate = (cashier: IUser) => {
      const newData = cashiers.map(pCashier => pCashier.id == cashier.id ? cashier : pCashier);
      setCashiers(newData);
    };

    const onDelete = (cashierId: string) => { 
      const newData = cashiers.filter(pCashier => pCashier.id != cashierId);
      console.log("New Data", cashierId)
      setCashiers(newData);
    };

    const providerData: IShopCashiersContext = {
      loading,
      error,
      shopId,
      reload,
      onDelete,
      onUpdate,
      cashiers,
      setLoading: setIsLoading,
    };
  
    return (
      <ShopCashiersContext.Provider value={providerData}>
        {children}
      </ShopCashiersContext.Provider>
    );
  };
  
  export const useShopCashiersContext = () => useContext(ShopCashiersContext)!;
  