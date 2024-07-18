import React, {
    createContext,
    useContext,
    useState,
    ReactNode,
  } from "react"; 
import { ISuperAgentInfo } from "@/utils/shared/shared-types/agentModels";

  
  export interface IProviderSuperAgentDetailContext {
    loading: boolean;
    setLoading: (loading: boolean) => void; 
    error: string | null; 
    profile: ISuperAgentInfo;  
    onUpdate: (superAgent: ISuperAgentInfo) => void; 
  }
  
  const ProviderSuperAgentDetailContext = createContext<IProviderSuperAgentDetailContext | undefined>(
    undefined
  );
  
  export const ProviderSuperAgentDetailProvider = ({
    children, 
    superAgent
  }: {
    superAgent: ISuperAgentInfo,
    children: ReactNode; 
  }) => {
    const [loading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [profile, setProfile] = useState<ISuperAgentInfo>(superAgent);
    

    const onProfileUpdate = (superAgent: ISuperAgentInfo) => {
      
      setProfile(superAgent)
    };
    
 

    const providerData: IProviderSuperAgentDetailContext = {
      loading,
      error,   
      setLoading: setIsLoading,
      onUpdate: onProfileUpdate,
      profile,

    };
  
    return (
      <ProviderSuperAgentDetailContext.Provider value={providerData}>
        {children}
      </ProviderSuperAgentDetailContext.Provider>
    );
  };
  
  export const useProviderSuperAgentDetailContext = () => useContext(ProviderSuperAgentDetailContext)!;
  