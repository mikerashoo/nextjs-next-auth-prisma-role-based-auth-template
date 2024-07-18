import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { GENERAL_ERROR_MESSAGE } from "@/utils/constants";
import { GetServerSidePropsContext, PreviewData } from "next";
import { getServerSession } from "next-auth";
import { ParsedUrlQuery } from "querystring";
export interface IServerSideAPiResponse<T> {
  status: number;
  data?: T;
  errorMessage?: any;
}
export async function serverSideApiCall(url: string, context: GetServerSidePropsContext<ParsedUrlQuery, PreviewData>): Promise<IServerSideAPiResponse<any>> {
  try{
    const session = await getServerSession(context.req, context.res, authOptions);
 
    if (!session) {
        throw new Error('Session not found' )
      
    }
  
    // Assuming the access token is stored in the session
    const accessToken = session.accessToken;
  
    if (!accessToken) {
      console.error('Access token not found in session');
      throw new Error('Authentication error' )
    }
   
    console.log("Session on serverSideAPi Call", session)
    const response = await fetch(url, {
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
    });

    const status = response.status;

    let responseJson = await response.json();

    console.log("Response Json", responseJson);

    if (!response.ok) {
      return {
        status,
        errorMessage: responseJson.error ?? responseJson,
      };
    }

    return {
      status,
      data: responseJson,
    };
  
   
    if (!response.ok) {
      throw new Error(`API call failed: ${response.status}`);
    }
  
    return response.json();

  } catch (error) {
    return {
      status: 500,
      errorMessage: GENERAL_ERROR_MESSAGE,
    };
  }
  }