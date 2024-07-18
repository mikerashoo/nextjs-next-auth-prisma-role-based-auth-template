import PageHeader from '@/components/ui-components/PageHeader'
import React from 'react'
import ProviderSuperAgentAddModal from './ProviderSuperAgentAddModal'
import { useProviderSuperAgentsContext } from '@/contexts/super-agents/ProviderSuperAgentsListContext';
import { UserGroupIcon } from '@heroicons/react/20/solid';
import { LockIcon, StarIcon } from '@chakra-ui/icons';
import { ActiveStatus } from '@/utils/shared/shared-types/prisma-enums';
import StatusIcon from '@/components/ui-components/StatusIcon';
import { IProviderSuperAgentsProps } from './ProviderSuperAgentsPageWrapper';

function ProviderSuperAgentListHeader({superAgents, error} : IProviderSuperAgentsProps) { 
  return (
    <PageHeader 
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
      //  !error && <ProviderSuperAgentAddModal key={'add'} />
    ]}
    />
  )
}

export default ProviderSuperAgentListHeader