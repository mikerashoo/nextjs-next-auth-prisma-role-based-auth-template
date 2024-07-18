// api.ts

import { GENERAL_ERROR_MESSAGE } from "@/utils/constants";
import { getAccessToken } from "./auth";

export interface ICallAPiResponse<T> {
  status: number;
  data?: T;
  errorMessage?: any;
}


export interface IApiCallParams {
  endpoint: string, 
  method: string,
  body?: any 
}
export async function callApiFromParams(
 {
  endpoint,
  method ,
  body = null
 } : IApiCallParams
): Promise<ICallAPiResponse<any>> {
  
  try {
    const accessToken = await getAccessToken();

  const headers: HeadersInit = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${accessToken}`,
  };

  const options: RequestInit = {
    method,
    headers,
  };

  if (body) {
    options.body = JSON.stringify(body);
  }

    const response = await fetch(endpoint, options);
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
  } catch (error) {
    return {
      status: 500,
      errorMessage: GENERAL_ERROR_MESSAGE,
    };
  }
}

export async function callApi(
  endpoint: string,
  method: string = "GET",
  body: any = null
): Promise<ICallAPiResponse<any>> {
  
  try {
    const accessToken = await getAccessToken();

  const headers: HeadersInit = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${accessToken}`,
  };

  const options: RequestInit = {
    method,
    headers,
  };

  if (body) {
    options.body = JSON.stringify(body);
  }

    const response = await fetch(endpoint, options);
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
  } catch (error) {
    return {
      status: 500,
      errorMessage: GENERAL_ERROR_MESSAGE,
    };
  }
}

export async function callNoAuthApi(
  endpoint: string,
  method: string = "GET",
  body: any = null
): Promise<ICallAPiResponse<any>> {
  const headers: HeadersInit = {
    "Content-Type": "application/json",
  };

  const options: RequestInit = {
    method,
    headers,
  };

  if (body) {
    options.body = JSON.stringify(body);
  }

  const response = await fetch(endpoint, options);
  const status = response.status;

  if (!response.ok) {
    let errorMessage = await response.json();

    console.log("Error status", response.status);
    console.log("Error status text", response.statusText);
    console.log("Error response", errorMessage);

    return {
      status,
      errorMessage,
    };
  }
  const data = await response.json();

  return {
    status,
    data,
  };
}
