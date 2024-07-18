import { shopInformationApiService } from "@/backend-services/provider-api-calls/shops/information";
import { GENERAL_ERROR_MESSAGE } from "@/utils/constants";
import { IProviderCommonQuerySchema } from "@/utils/shared/schemas/reportSchema"; 
import { IShopWithDetail } from "@/utils/shared/shared-types/providerAndShop";
import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
  useCallback,
} from "react"; 

export interface IShopListContext { 
  loading: boolean;
  setLoading: (boolean) => void;
  error: string | null;  
  reload: () => void;  
  shops: IShopWithDetail[] 
  filterQuery?: IProviderCommonQuerySchema
}



const ShopListContext = createContext<IShopListContext | undefined>(
  undefined
);

export const ShopListProvider = ({
  children,
  filterQuery
}: {
  children: ReactNode; 
  filterQuery?: IProviderCommonQuerySchema
}) => { 
  const [loading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [shops, setShops] = useState<IShopWithDetail[]>([]);

 
  const fetchShops = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);

      const shopListData = await shopInformationApiService.list(filterQuery);
      if (shopListData.errorMessage) {
        setError(shopListData.errorMessage);
        setIsLoading(false);
      }

      if (shopListData.data) { 
          console.log("Fetch shops called", shopListData.data);

          setShops(shopListData.data);
          setIsLoading(false); 
      }
    } catch (error) {
      console.error("fetchGame on context catch error", error);

      setError(GENERAL_ERROR_MESSAGE + " white fetching shops");
    }
  }, [filterQuery]);

  useEffect(() => {
    fetchShops();
  }, [fetchShops]);
 
  const reload = () => {
    fetchShops()
  };
 

  const providerData: IShopListContext = {
    loading,
    error, 
    reload,  
    shops,
    filterQuery,
    setLoading: setIsLoading
  };

  return (
    <ShopListContext.Provider value={providerData}>
      {children}
    </ShopListContext.Provider>
  );
};

export const useShopListContext = () => useContext(ShopListContext)!;
