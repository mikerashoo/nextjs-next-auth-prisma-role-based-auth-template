


import React from 'react'
import { IUser } from "@/utils/shared/shared-types/userModels";
import { PageLayout } from '@/components/layout/PageLayout';
import PageHeader from '@/components/ui-components/PageHeader';
import StatusIcon from '@/components/ui-components/StatusIcon'; 
import { UserGroupIcon } from '@heroicons/react/20/solid';
import ProviderSuperAgentList from './ProviderSuperAgentList';
import { ActiveStatus } from '@/utils/shared/shared-types/prisma-enums'; 
import { useRouter } from 'next/router';
import GeneralErrorComponent from '@/components/common/GeneralErrorComponent';
import ProviderSuperAgentAddModal from './ProviderSuperAgentAddModal';

export interface IProviderSuperAgentsProps {
  superAgents: IUser[],
  error: string
}

function ProviderSuperAgentsPageWrapper({error, superAgents} : IProviderSuperAgentsProps) {
  const router = useRouter();
 
  return (
    <PageLayout pageHeader={  <PageHeader
      isLoading={false}
      title='Super Agents'
      statics={!error &&  [
        {
          icon: <UserGroupIcon width={16} />,
          label: `Total ${superAgents.length} super agents`
        },
        {
          label:
            superAgents.filter((br) => br.status == ActiveStatus.ACTIVE).length +
            " Active",
          icon: <StatusIcon isActive={true} />,
        },
  
        {
          label:
            superAgents.filter((br) => br.status == ActiveStatus.IN_ACTIVE).length +
            " In Active",
          icon: <StatusIcon isActive={false} />,
        },
  
       
      ]}
      actions={[
         <ProviderSuperAgentAddModal key={'add'} />
      ]}
      />}>
    <ProviderSuperAgentList error={error}  superAgents={superAgents} />
 </PageLayout>
  )
}

export default ProviderSuperAgentsPageWrapper