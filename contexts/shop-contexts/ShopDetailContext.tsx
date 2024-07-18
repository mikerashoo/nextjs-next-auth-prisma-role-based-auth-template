import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
  useCallback,
} from "react";
import { shopInformationApiService } from "@/backend-services/provider-api-calls/shops/information";
import { GENERAL_ERROR_MESSAGE } from "@/utils/constants";
import { IShopWithDetail } from "@/utils/shared/shared-types/providerAndShop";

export interface IShopDetailContext {
  loading: boolean;
  setLoading: (boolean) => void;
  selectedTab: number; 
  setSelectedTab: React.Dispatch<React.SetStateAction<number>>;
  error: string | null;
  reload: () => void;
  onUpdate: (data:  IShopWithDetail) => void;
  shop: IShopWithDetail;
}

const ShopDetailContext = createContext<IShopDetailContext | undefined>(
  undefined
);

export const ShopDetailProvider = ({
  children,
  shopIdentifier,
}: {
  children: ReactNode;
  shopIdentifier: string;
}) => {
  const [loading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [shop, setShop] = useState<IShopWithDetail>();
  const [selectedTab, setSelectedTab] = useState(0);

  const fetchShopDetail = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);

      const shopDetailData = await shopInformationApiService.detail(
        shopIdentifier
      );
      if (shopDetailData.errorMessage) {
        setError(shopDetailData.errorMessage);
        setIsLoading(false);
      }

      if (shopDetailData.data) {
        console.log("Fetch shops called", shopDetailData.data);

        setShop(shopDetailData.data);
        setIsLoading(false);
      }
    } catch (error) {
      console.error("fetchGame on context catch error", error);

      setError(GENERAL_ERROR_MESSAGE + " white fetching shops");
    }
  }, [shopIdentifier]);

  useEffect(() => {
    fetchShopDetail();
  }, [fetchShopDetail]);

  const reload = () => {
    fetchShopDetail();
  };
 
  const onUpdate = (profile: IShopWithDetail) => {
    setShop({
      ...shop,
      ...profile
    })
  }

  const providerData: IShopDetailContext = {
    loading,
    error,
    reload,
    shop, 
    selectedTab,
    setSelectedTab,
    onUpdate,
    setLoading: setIsLoading,
  };

  return (
    <ShopDetailContext.Provider value={providerData}>
      {children}
    </ShopDetailContext.Provider>
  );
};

export const useShopDetailContext = () => useContext(ShopDetailContext)!;
