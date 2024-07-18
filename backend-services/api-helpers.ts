export const convertSchemaToUrlParams = (data: any): string => {
    // Filter out undefined or null values
    const filteredData = Object.entries(data).filter(
      ([key, value]) => value !== undefined && value !== null
    ) as [string, string][];
  
    // Convert to query string
    const queryParams = new URLSearchParams(filteredData).toString();
  
    return queryParams;
  };
  