 

import React, { useCallback, useEffect, useState } from 'react'

import { providerCommonAgentApiCalls } from '@/backend-services/provider-api-calls/agent-super-agents/common/provider-agent-common-api-calls';
import { shopInformationApiService } from '@/backend-services/provider-api-calls/shops/information';
import AppIcon from '@/components/ui-components/AppIcon/CommonIcon';
import { IconName } from '@/components/ui-components/AppIcon/icon-list';
import AppModal from '@/components/ui-components/modals/AppModal';
import { useShopDetailContext } from '@/contexts/shop-contexts/ShopDetailContext';
import { GENERAL_ERROR_MESSAGE } from '@/utils/constants';
import { IShopUpdateSchema } from '@/utils/shared/schemas/provider/shop-information-schema';
import { IAgentWithSuperAgent } from '@/utils/shared/shared-types/agentModels';
import { IShopWithDetail } from '@/utils/shared/shared-types/providerAndShop';
import { useToast } from '@chakra-ui/react';
import { Combobox, ComboboxInput, ComboboxOption, ComboboxOptions, Description, Field, Label } from '@headlessui/react' 
import AppSelect from '@/components/ui-components/AppSelect';
import { getFullName } from '@/utils/common-hepers';

function ChangeShopAgentModal() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const {setLoading, error, loading, onUpdate, shop } = useShopDetailContext();

  return (
    <AppModal
    isOpen={isOpen}
    setIsOpen={setIsOpen}
    loading={loading}
    title={"Edit " + shop.name}
    toggleButton={
      <button className="flex items-center justify-center w-full md:w-1/2 px-5 py-2 text-sm tracking-wide text-white transition-colors duration-200 bg-orange-500 rounded-lg shrink-0 sm:w-auto gap-x-2 hover:bg-orange-600 dark:hover:bg-orange-500 dark:bg-teal-600">
      <AppIcon name={IconName.Recycle} />
      
      Remove / Assign To Other
      </button>
    }
  >
    <ChangeShopAgent onUpdate={onUpdate} shop={shop} />
    </AppModal>
  )

   
}

export default ChangeShopAgentModal
 

function ChangeShopAgent({onUpdate, shop} : {
  shop: IShopWithDetail,
  onUpdate: (data: IShopWithDetail) => void}
) {

 
  const [agents, setAgents] = useState<IAgentWithSuperAgent[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);


  const toast = useToast();


  async function onSubmit(data: IShopUpdateSchema) {
    // setLoading(true);
    const success = await shopInformationApiService.update(shop.id, data);

    if (success.data) { 

      toast({
        status: "success",
        position: "top",
        title: "Shop Updated Successfully",
      });
      setIsLoading(false);
 

      onUpdate(success.data)
    }
    
    setIsLoading(false);

    return success;
  }


  const fetchAgentList = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);

      const shopDetailData = await providerCommonAgentApiCalls.commonList(
        
      );
      if (shopDetailData.errorMessage) {
        setError(shopDetailData.errorMessage);
        setIsLoading(false);
      }

      if (shopDetailData.data) {
        console.log("Fetch shops called", shopDetailData.data);

        setAgents(shopDetailData.data);
        setIsLoading(false);
      }
    } catch (error) {
      console.error("fetchGame on context catch error", error);

      setError(GENERAL_ERROR_MESSAGE + " white fetching shops");
    }
  }, []);

  useEffect(() => {
    fetchAgentList();
  }, [fetchAgentList]);
 
  const [query, setQuery] = useState('')

  const filteredAgents =
    query === ''
      ? agents
      : agents.filter((agent) => {
          return getFullName(agent).toLowerCase().includes(query.toLowerCase())
        })

        return (
          <AppSelect basic defaultLabel='Select Agent' onSelect={()=>{}} options={filteredAgents.map(agent => {
            return {
              label: getFullName(agent),
              value:agent.id,
            }
          })} />
          // <Combobox value={selectedPerson} onChange={setSelectedPerson} onClose={() => setQuery('')}>
          //   <ComboboxInput
          //     aria-label="Assignee"
          //     displayValue={(agent: any) => person?.name}
          //     onChange={(event) => setQuery(event.target.value)}
          //   />
          //   <ComboboxOptions anchor="bottom" className="border empty:invisible">
          //     {filteredAgents.map((person) => (
          //       <ComboboxOption key={person.id} value={person} className="data-[focus]:bg-blue-100">
          //         {person.name}
          //       </ComboboxOption>
          //     ))}
          //   </ComboboxOptions>
          // </Combobox>
        )
}
 