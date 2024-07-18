import { PageLayout } from '@/components/layout/PageLayout'
import AdvancedTable from '@/components/ui-components/AdvancedTable'
import AppTable from '@/components/ui-components/AppTable'
import PageHeading from '@/components/ui-components/PageHeading'
import PageHeadingCustom from '@/components/ui-components/PageHeadingCustom'
import StatusIcon from '@/components/ui-components/StatusIcon'
import { ActiveStatus } from '@/utils/shared/shared-types/prisma-enums'
import { IUser } from '@/utils/shared/shared-types/userModels'
import React, { useState } from 'react'
import ProviderAgentAddModal from './ProviderAgentAddModal'

function ProviderAgentListWrapper({
    agentList
} : {
    agentList: IUser[]
}) {

    const [loading, setLoading] = useState(false)
    const [agents, setAgents] = useState<IUser[]>(agentList)

    
  return (
    <PageLayout pageHeader={ <PageHeading title='Agents' action={
        <ProviderAgentAddModal onUpdate={(user) => setAgents([...agents, user])} />
    }/>  }>
       

      
      
        <AdvancedTable columns={[
            {
                label: 'Full Name',
                selectorFunction(item) {
                    return `${item.firstName} ${item.lastName}`
                }, 
            },
            {
                label: 'Phone Number',
                selectorKey: 'phoneNumber'
            },
            {
                label: 'Email',
                selectorKey: 'email'
            },
            {
                label: 'User Name',
                selectorKey: 'userName'
            },
            {
                label: 'Status',
                selectorFunction(item: IUser) {
                    return <StatusIcon isActive={item.status == ActiveStatus.ACTIVE} />
                },
            }
        ]} primaryCol={'Full Name'} data={agents} actions={
            [
                {
                    label: 'Detail',
                    onClick: (item) => console.log('Detail of', item.id)
                }
            ]
        } />

</PageLayout>
  )
}

export default ProviderAgentListWrapper