import { format } from "date-fns";
import { IDatePeriod, IFilterDateRanges } from "../report-hepers";

export const formatDateForFilter = (date: Date): string => { 
    const year = date.getFullYear();
    const month = `0${date.getMonth() + 1}`.slice(-2); // Months are zero indexed
    const day = `0${date.getDate()}`.slice(-2);
    return `${year}-${month}-${day}`;
  }; 

export const now = new Date();
 

export const getFilterStartEndFromPeriod = (
  period: IDatePeriod
): IFilterDateRanges => {
  return {
    start: period.startDate,
    end: period.endDate,
  };
};
