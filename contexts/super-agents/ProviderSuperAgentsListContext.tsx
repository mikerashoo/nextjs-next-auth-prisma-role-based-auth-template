import React, {
    createContext,
    useContext,
    useEffect,
    useState,
    ReactNode,
    useCallback,
  } from "react"; 
  import { GENERAL_ERROR_MESSAGE } from "@/utils/constants";  
import { IUser } from "@/utils/shared/shared-types/userModels";
import { providerSuperAgentListApiCalls } from "@/backend-services/provider-api-calls/super-agent-management/super-agent-list-api-calls";
import { ISuperAgentRegisterSchema } from "@/lib/schemas/userSchemas";

  
  export interface IProviderSuperAgentListContext {
    loading: boolean;
    setLoading: (loading: boolean) => void; 
    error: string | null;
    reload: () => void;
    superAgents: IUser[]; 
    onAdd: (superAgent: IUser) => void;
    onUpdate: (superAgent: IUser) => void;
    onDelete: (cashierId: string) => void;
  }
  
  const ProviderSuperAgentListContext = createContext<IProviderSuperAgentListContext | undefined>(
    undefined
  );
  
  export const ProviderSuperAgentListProvider = ({
    children, 
    _superAgents
  }: {
    _superAgents: IUser[],
    children: ReactNode; 
  }) => {
    const [loading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [superAgents, setSuperAgents] = useState<IUser[]>(_superAgents);
  
    const fetchSuperAgents = useCallback(async () => {
      console.log("Fetch super agents called")
        try {
          setIsLoading(true);
          setError(null);
    
          const superAgentListApiResponse = await providerSuperAgentListApiCalls.list();
          if (superAgentListApiResponse.errorMessage) {
            setError(superAgentListApiResponse.errorMessage);
            setIsLoading(false);
          }
    
          if (superAgentListApiResponse.data) { 
            
              setSuperAgents(superAgentListApiResponse.data);
              setIsLoading(false); 
          }
        } catch (error) {
          console.error("fetchGame on context catch error", error);
    
          setError(GENERAL_ERROR_MESSAGE + " white fetching super agents");
        }
      }, []);
    
     
     

    const onAdd =  async (data: IUser) => {
      setSuperAgents([...superAgents, data]);
      
    };

    const onUpdate = (superAgent: IUser) => {
      const newData = superAgents.map(pCashier => pCashier.id == superAgent.id ? superAgent : pCashier);
      setSuperAgents(newData);
    };

    const onDelete = (cashierId: string) => { 
      const newData = superAgents.filter(pCashier => pCashier.id != cashierId);
      console.log("New Data", cashierId)
      setSuperAgents(newData);
    };

    const providerData: IProviderSuperAgentListContext = {
      loading,
      error, 
      onDelete,
      onUpdate,
      onAdd,
      superAgents,
      reload: fetchSuperAgents,
      setLoading: setIsLoading,
    };
  
    return (
      <ProviderSuperAgentListContext.Provider value={providerData}>
        {children}
      </ProviderSuperAgentListContext.Provider>
    );
  };
  
  export const useProviderSuperAgentsContext = () => useContext(ProviderSuperAgentListContext)!;
  