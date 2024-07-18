 
 
 import { GetServerSideProps, InferGetServerSidePropsType } from 'next'; 
 import { IServerSideAPiResponse, serverSideApiCall } from '@/lib/serverApiCall'; 
import { ISuperAgentInfo } from '@/utils/shared/shared-types/agentModels';
import { PROVIDER_SUPER_AGENT_END_POINT_PREFIX } from '@/utils/types/constants/backend-constants'; 
import GeneralErrorComponent from '@/components/common/GeneralErrorComponent';
import { GENERAL_ERROR_MESSAGE } from '@/utils/constants';
import SuperAgentDetailWrapper from '@/components/provider-components/agent-super-agent/super-agents/detail/SuperAgentDetailWrapper';
 

export const getServerSideProps: GetServerSideProps = async (context) => {
  
  try {
    const {superAgentIdentifier} = context.query;
    const superAgent: IServerSideAPiResponse<ISuperAgentInfo>  = await serverSideApiCall(
     PROVIDER_SUPER_AGENT_END_POINT_PREFIX + superAgentIdentifier + '/info',
      context
    );
    console.log("Super agent coll", superAgent)
    return { props: superAgent };
  } catch (error) {
    console.error('Failed to fetch super agents:', error);
    return { props: { error: 'Failed to fetch data' } };
  }
};

export default function Page({ 
   data,
   status, 
   errorMessage
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  if(data)  return <SuperAgentDetailWrapper superAgentDetail={data} /> 
  
  return <GeneralErrorComponent error={errorMessage ?? GENERAL_ERROR_MESSAGE} />
   
}
 