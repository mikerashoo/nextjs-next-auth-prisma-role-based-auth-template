import React, { useState } from "react";
import {
  IDatePeriod,
  IFilterDateRanges,
  filterPeriods,
} from "@/utils/report-hepers";
import { FormControl, Input, Select } from "@chakra-ui/react";
import {
  formatDateForFilter,
  getFilterStartEndFromPeriod,
} from "@/utils/common-hepers/date-time-helpers";
import { CloseIcon, MinusIcon } from "@chakra-ui/icons";
import { isAfter } from "date-fns";
import ChakraRadio from "../ui-components/ChakraRadio";
import AppDateRangePicker from "./AppDateRangePicker";
import Datepicker from "react-tailwindcss-datepicker";

interface IFilterByPeriodComboProps {
  onValuesChange: (dateRanges: IFilterDateRanges) => void;
}

export default function FilterByPeriodCombo({
  onValuesChange,
}: IFilterByPeriodComboProps) {
  const [selectedPeriod, setSelectedPeriod] = useState<string>(
    filterPeriods[0].value
  );

  const [DateRangesDate, setDateRangesDate] = useState<IFilterDateRanges>(
    getFilterStartEndFromPeriod(filterPeriods[0])
  );

  const onChange = (value: string) => {
    setSelectedPeriod(value);
    console.log("Custom called", value);

    if (value != "custom") {
      const _period = filterPeriods.find((fP) => fP.value == value);

      onValuesChange(getFilterStartEndFromPeriod(_period));
    }
  };

  const onCustomChange = (values: IFilterDateRanges) => {
    console.log("Values", values);
    setDateRangesDate(values);
    onValuesChange(values);
  };

  return (
    <ChakraRadio
      onSelect={onChange}
      options={filterPeriods.map((fP) => {
        return {
          // label: selectedPeriod == 'custom' && fP.value != 'custom' ? fP.label.charAt(0) : fP.label,
          label: fP.label,
          value: fP.value,
          additionalComponent:
            fP.value == "custom" &&(
              <CustomDatePicker
                defaultDates={DateRangesDate}
                onChange={onCustomChange}
              />
            ) 
        };
      })}
    />
  );

  return (
    <div className="flex flex-col gap-2 w-full">
      <Select
        bg={"white"}
        onChange={(e) => onChange(e.target.value)}
        value={selectedPeriod}
      >
        {filterPeriods.map((filterOption) => {
          return (
            <option value={filterOption.value} key={filterOption.value}>
              {filterOption.label}
            </option>
          );
        })}
      </Select>
      {selectedPeriod == "custom" && (
        <CustomDatePicker
          defaultDates={DateRangesDate}
          onChange={onCustomChange}
        />
      )}
    </div>

    //     <AppSelect
    //     options={filterPeriods.map((filterOption) => {
    //       return {
    //         label: filterOption.label,
    //         value: filterOption.value,
    //       };
    //     })}
    //     onSelect={(selected) => {
    //       onPeriodFilterChange(selected.value);
    //     }}
    //     key="date filter"
    //     defaultLabel="Today"
    //   />
  );
}

interface ICustomDatePickerProps {
  defaultDates: IFilterDateRanges;
  onChange: (dateRanges: IFilterDateRanges) => void;
}

interface ICustomDateRangeValues {
  startDate: Date;
  endDate: Date;
}
export function CustomDatePicker({
  defaultDates,
  onChange,
}: ICustomDatePickerProps) {
  // const customStartDate = defaultDates.start;
  // const customEndDate = defaultDates.length > 1 ? defaultDates[1] : null;

  const now = new Date();
  const onCustomRangeChange = (selectedDate, index: number) => {
    const dateToUpdate = new Date(selectedDate);

    const start = index == 0 ? dateToUpdate : defaultDates.start;
    const end = index == 1 ? dateToUpdate : defaultDates.end;

    let isStartGreater = isAfter(start, end);

    onChange({
      start: isStartGreater ? end : start,
      end: isStartGreater ? start : end,
    });
  };

  const [value, setValue] = useState<ICustomDateRangeValues>({
    startDate: defaultDates.start,
    endDate: defaultDates.end,
  });

  const handleValueChange = (newValue: ICustomDateRangeValues) => {
    console.log("newValue:", newValue);
    setValue(newValue);
    onChange({
      start: new Date(newValue.startDate),
      end: new Date(newValue.endDate),
    });
  };

  return (
    <Datepicker
      startFrom={defaultDates.start}
      showFooter
      useRange={false}
      inputClassName="w-full rounded-md mx-4 font-normal bg-white p-2 dark:placeholder:text-green-400"
      toggleIcon={(sele) => {
        return <></>;
      }}
      maxDate={now}
      value={value}
      onChange={handleValueChange}
      configs={{
        footer: {
          cancel: "Cancel",
          apply: "Apply",
        },
      }}
    />
  );
  return (
    <div className="flex flex-row  rounded-lg  w-full items-center justify-center  gap-2">
      <FormControl>
        <Input
          placeholder="Select Date and Time"
          size="md"
          datatype=""
          value={formatDateForFilter(defaultDates.start)}
          // defaultValue={formatDateForFilter(new Date(startAt))}
          onChange={(e) => onCustomRangeChange(e.target.value, 0)}
          type="date"
          bg={"white"}
          max={formatDateForFilter(now)}
          className="w-full"
        />
      </FormControl>

      <MinusIcon />
      <FormControl>
        <Input
          placeholder="End date"
          size="md"
          type="date"
          bg={"white"}
          value={formatDateForFilter(defaultDates.end)}
          onChange={(e) => onCustomRangeChange(e.target.value, 1)}
          max={formatDateForFilter(now)}
          className="w-full"
        />
      </FormControl>
    </div>
  );
}
