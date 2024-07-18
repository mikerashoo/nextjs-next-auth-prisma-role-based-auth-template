


import { GetServerSideProps, InferGetServerSidePropsType } from 'next'; 
import { IServerSideAPiResponse, serverSideApiCall } from '@/lib/serverApiCall';
import { IUser } from '@/utils/shared/shared-types/userModels'; 
import { PROVIDER_AGENTS_END_POINT_PREFIX } from '@/utils/types/constants/backend-constants';
import GeneralErrorComponent from '@/components/common/GeneralErrorComponent';
import ProviderSuperAgentsPageWrapper from '@/components/provider-components/agent-super-agent/super-agents/ProviderSuperAgentsPageWrapper';
import ProviderAgentListWrapper from '@/components/provider-components/agent-super-agent/agents/ProviderAgentListWrapper';

 
 
export const getServerSideProps: GetServerSideProps = async (context) => {
  
  try {
    const agents:  IServerSideAPiResponse<IUser[]> = await serverSideApiCall(
      PROVIDER_AGENTS_END_POINT_PREFIX + 'list',
      context
    );
    return { props: agents};
  } catch (error) {
    console.error('Failed to fetch super agents:', error);
    return { props: { error: 'Failed to fetch data' } };
  }
};

export default function Page({
  data,
   status, 
   errorMessage,
   error,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  
 if(data) return <ProviderAgentListWrapper agentList={data}/>
 return <GeneralErrorComponent error={errorMessage ?? error}/>
}