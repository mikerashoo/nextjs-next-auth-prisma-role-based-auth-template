import React, { useEffect, useState } from "react";
import {
  CustomPeriod,
  IFilterDateRanges,
  filterPeriods,
} from "@/utils/report-hepers";
import {
  Box,
  Button,
  Heading,
  useColorModeValue,
  useDisclosure,
  Popover,
  ButtonGroup,
  PopoverBody,
  PopoverContent,
  PopoverFooter,
  PopoverTrigger,
  FormControl,
  FormLabel,
  Portal,
  PopoverArrow,
} from "@chakra-ui/react";

// import { Popover, PopoverBackdrop, PopoverButton, PopoverPanel } from '@headlessui/react'
import {
  formatDateForFilter,
  getFilterStartEndFromPeriod,
  now,
} from "@/utils/common-hepers/date-time-helpers";
import ChakraRadio from "../ui-components/ChakraRadio";
import { SingleDatepicker } from "chakra-dayzed-datepicker";
import { format } from "date-fns";
interface IFilterByPeriodComboProps {
  onValuesChange: (dateRanges: IFilterDateRanges) => void;
  onPeriodLabelChange: (periodLabel: string) => void;
  loading?: boolean;
}

export default function FilterByPeriodCombo({
  loading,
  onValuesChange,
  onPeriodLabelChange
}: IFilterByPeriodComboProps) {
  const { isOpen, onOpen, onClose, onToggle } = useDisclosure();
 
  const [selectedPeriod, setSelectedPeriod] = useState(filterPeriods[0]);
  const [customStartDate, setCustomStartDate] = useState(new Date());
  const [customEndDate, setCustomEndDate] = useState(new Date());

  const onChange = (value: string) => {
    console.log("Custom called", value);

    if (value != "custom") {
      const _period = filterPeriods.find((fP) => fP.value == value);

      onValuesChange(getFilterStartEndFromPeriod(_period));
      setSelectedPeriod(_period); 
      onPeriodLabelChange(_period.label)
    }
  };

  const onCustomChange = (values: IFilterDateRanges) => {
    onValuesChange(values);
  };

  const onApply = () => {
    const values: IFilterDateRanges = {
      start: customStartDate,
      end: customEndDate,
    };
    onCustomChange(values);
    setSelectedPeriod(CustomPeriod);

    onPeriodLabelChange(`${customStartDate.toLocaleDateString()} - ${customEndDate.toLocaleDateString()}`)

    onClose();
  };
 
  

  const customStartShortHand = format(customStartDate, "dd/MM");
  const customEndShortHand = format(customEndDate, "dd/MM");

  const customDatePicker = (
    <Popover
      returnFocusOnClose={false}
      isOpen={isOpen}
      onClose={onClose}
      isLazy
      placement="bottom-start"
    >
      <PopoverTrigger>
        <span   onClick={onToggle} >
          {selectedPeriod == CustomPeriod
            ? `${customStartShortHand}-${customEndShortHand}`
            : "Start - End"}
        </span>
      </PopoverTrigger>
      <Portal>
        <PopoverContent>
          <PopoverArrow bg="#13db63" borderColor="blue.800" />
          <PopoverBody>
            <FormControl>
              <FormLabel>Select Start Date</FormLabel>
              <SingleDatepicker
                propsConfigs={{
                  triggerBtnProps: {
                    width: "100%",
                  },
                }}
                name="start-date"
                date={customStartDate}
                maxDate={now}
                onDateChange={setCustomStartDate}
              />
            </FormControl>
            <FormControl>
              <FormLabel>Select End Date</FormLabel>
              <SingleDatepicker
                propsConfigs={{
                  triggerBtnProps: {
                    width: "100%",
                  },
                }}
                name="end-date"
                date={customEndDate}
                maxDate={now}
                onDateChange={setCustomEndDate}
              />
            </FormControl>
          </PopoverBody>
          <PopoverFooter display="flex" justifyContent="flex-end">
            <ButtonGroup size="sm">
              <Button variant="outline" onClick={onClose}>
                Cancel
              </Button>
              <Button onClick={onApply} colorScheme="red">
                Apply
              </Button>
            </ButtonGroup>
          </PopoverFooter>
        </PopoverContent>
      </Portal>
    </Popover>
  );
  return ( 
      
        <ChakraRadio
        isDisabled={loading}
        selected={selectedPeriod.value}
          onSelect={onChange}
          options={filterPeriods.map((fP) => {
            return {
              // label: selectedPeriod == 'custom' && fP.value != 'custom' ? fP.label.charAt(0) : fP.label,
              value: fP.value,
              label: fP.value != "custom" ? fP.label : customDatePicker,
            };
          })}
        />  
  );
}
