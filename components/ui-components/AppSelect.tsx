import { Select } from "@chakra-ui/react";
import {
  Combobox,
  ComboboxButton,
  ComboboxInput,
  ComboboxOption,
  ComboboxOptions,
} from "@headlessui/react";
import { CheckIcon, ChevronDownIcon } from "@heroicons/react/20/solid";
import clsx from "clsx";
import { useEffect, useState } from "react";

export interface IAppSelectOption {
  label: string;
  value?: string;
}

interface IAppSelectProps {
  defaultLabel: string;
  fit?: boolean;
  current?: IAppSelectOption;
  options: IAppSelectOption[];
  basic?: boolean;
  onSelect: (selected: IAppSelectOption) => void;
}

export default function AppSelect({
  options,
  defaultLabel,
  fit,
  basic,
  onSelect,
}: IAppSelectProps) {
  const defaultSelect: IAppSelectOption = options.find(op => op.label == defaultLabel) ?  options.find(op => op.label == defaultLabel) : {
    label: defaultLabel ?? options[0].label,
    value: defaultLabel ? null : options[0].label,
  };

  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState<IAppSelectOption>(defaultSelect);

  const filteredPeople =
    query === ""
      ? options
      : options.filter((option) => {
          return option.label.toLowerCase().includes(query.toLowerCase());
        });

  const onChange = (_selected: IAppSelectOption) => {
    setSelected(_selected);
    onSelect(_selected);
  };

  const onSearch = (value) => {
    if (value == "") {
      setSelected(defaultLabel ? defaultSelect : options[0]);
    }
    setQuery(value);
  };

  const optionsToShow = defaultSelect != options[0]
    ? [defaultSelect, ...filteredPeople]
    : filteredPeople;

    if(basic) {
      return (<Select
        bg={"white"}
        value={selected.value}
        onChange={(e) =>  onChange(e.target.value.trim().length == 0 ? options[0] : options.find(op =>  op.value == e.target.value) ?? options[0])}
      >
        {options.map((filterOption) => {
          return (
            <option value={filterOption.value} key={filterOption.value}>
              {filterOption.label}
            </option>
          );
        })}
      </Select>)
    }

  return (
    <div className={`w-full    ${fit ? 'md:w-fit' : 'w-full'}`}>
      <Combobox
        immediate
        value={selected}
        onChange={(value) => onChange(value)}
        onClose={() => {
          setQuery("");
        }}
        defaultValue={defaultLabel ? defaultSelect : options[0]}
      >
        <div className="relative">
          <ComboboxInput
            className={clsx(
              "w-full rounded-lg border-2  py-1.5 pr-8 pl-3 text-sm/6 bg-white ",
              "focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25"
            )}
            displayValue={(option: any) => option?.label}
            onChange={(event) => onSearch(event.target.value)}
          />
          <ComboboxButton className="group absolute inset-y-0 right-0 px-2.5">
            <ChevronDownIcon className="size-4 fill-slate-600 group-data-[hover]:fill-white" />
          </ComboboxButton>
        </div>

        <ComboboxOptions 
          transition
          className={clsx(
            "w-[var(--input-width)] rounded-xl border border-slate-100 bg-slate-100 p-1 [--anchor-gap:var(--spacing-1)] empty:invisible",
            "transition duration-100 ease-in data-[leave]:data-[closed]:opacity-0"
          )}
        >
          {optionsToShow.map((option) => (
            <ComboboxOption
              key={option.value}
              value={option}
              className="group flex cursor-pointer hover:text-lg items-center gap-2 rounded-lg py-1.5 px-3 select-none data-[focus]:bg-white"
            >
              <CheckIcon className="invisible size-4 fill-white group-data-[selected]:visible" />
              <div className="text-sm/6 ">{option.label}</div>
            </ComboboxOption>
          ))}
        </ComboboxOptions>
      </Combobox>
    </div>
  );
}
