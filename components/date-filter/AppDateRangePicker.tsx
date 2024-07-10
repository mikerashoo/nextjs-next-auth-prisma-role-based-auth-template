import { now } from "@/utils/common-hepers/date-time-helpers";
import React, { useState } from "react"; 
import Datepicker from "react-tailwindcss-datepicker"; 
function AppDateRangePicker() {
  const [value, setValue] = useState({
    startDate: null,
    endDate: now,
  });

  const handleValueChange = (newValue) => {
    console.log("newValue:", newValue);
    setValue(newValue);
  };
  return (
    <Datepicker maxDate={now} startFrom={now} value={value} onChange={handleValueChange} />
  );
}

export default AppDateRangePicker;
