import { endOfMonth, startOfMonth, startOfWeek } from "date-fns";
import { getFilterStartEndFromPeriod, now } from "../common-hepers/date-time-helpers";

export interface IDatePeriod {
    label: string;
    value: string;
    showRange?: boolean;
    startDate?: Date;
    endDate?: Date;
  }

  export interface IFilterDateRanges {
    start: Date;
    end: Date;
  }

  export const CustomPeriod: IDatePeriod =  {
    label: "Custom",
    value: "custom",
    showRange: true, 
  
  }

  export const filterPeriods: IDatePeriod[] = [
    {
      label: "Today's",
      value: "today",
      startDate: now,
      endDate: now,
    },
    {
      label: "Weekly",
      value: "week",
      showRange: true,
      startDate: startOfWeek(now, { weekStartsOn: 1 }), // Monday as the first day of the week
      endDate: now,
    },
    {
      label: "Monthly",
      value: "month",
      showRange: true,
  
      startDate: startOfMonth(now),
      endDate: endOfMonth(now),
    },

    CustomPeriod
   
  ];

  export const PeriodToday: IDatePeriod = {
    
      label: "Today",
      value: "today",
      startDate: now,
      endDate: now,
    
  }
   

export const PeriodTodayDateRanges = getFilterStartEndFromPeriod(PeriodToday);
