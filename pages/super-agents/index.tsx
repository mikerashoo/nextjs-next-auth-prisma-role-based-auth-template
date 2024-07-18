import { GetServerSideProps, InferGetServerSidePropsType } from 'next'; 
import { IServerSideAPiResponse, serverSideApiCall } from '@/lib/serverApiCall';
import { IUser } from '@/utils/shared/shared-types/userModels'; 
import { PROVIDER_SUPER_AGENT_END_POINT_PREFIX } from '@/utils/types/constants/backend-constants';
import GeneralErrorComponent from '@/components/common/GeneralErrorComponent';
import ProviderSuperAgentsPageWrapper from '@/components/provider-components/agent-super-agent/super-agents/ProviderSuperAgentsPageWrapper';

 
 
export const getServerSideProps: GetServerSideProps = async (context) => {
  
  try {
    const superAgents:  IServerSideAPiResponse<IUser[]> = await serverSideApiCall(
      PROVIDER_SUPER_AGENT_END_POINT_PREFIX + 'list',
      context
    );
    return { props: superAgents};
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
  
 if(data) return <ProviderSuperAgentsPageWrapper error={errorMessage} superAgents={data} />
 return <GeneralErrorComponent error={errorMessage ?? error}/>
}