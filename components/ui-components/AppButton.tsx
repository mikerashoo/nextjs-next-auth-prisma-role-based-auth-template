// import { Button, ButtonProps } from '@chakra-ui/react'
import { Spinner, ThemingProps } from "@chakra-ui/react";
import { Button } from "@headlessui/react";
import clsx from "clsx";
import React, { Fragment, JSXElementConstructor, ReactElement } from "react";

export enum ActionButton {
  Edit = 'edit', 
  Add = 'add',
  Delete = 'delete',
  Detail = 'detail',
  Custom = 'custom'
}

interface IAppButtonProps
  extends React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  status?: number | 1; // 0 for default, 1 for primary, -1 for warning 1 for warning
  children: React.ReactNode;
  icon?: ReactElement<any, string | JSXElementConstructor<any>>;
  size?: ThemingProps<"Button">['size'];
  loading?: boolean;
  loadinglabel?: string;
  editButton?: boolean, 
  deleteButton?: boolean,
  addButton?: boolean,
  full?: boolean,
  
}
function AppButton({
  children,
  icon,
  size,
  status,
  className,
  ...rest
}: IAppButtonProps) {
  const getClassNames = () => {
    if (status == 0)
      return "hover:ring-slate-200 hover:bg-slate-300 bg-gradient-to-r from-slate-200  to-slate-300 text-black";

    if (status == -1)
      return "hover:ring-orange-700 bg-gradient-to-r from-orange-500  via-orange-600 to-orange-500 text-white";
    if (status == -2)
      return "hover:ring-red-700 bg-gradient-to-r from-red-500  via-red-600 to-red-500 text-white";

    return "hover:ring-teal-700 bg-gradient-to-r from-teal-500  via-teal-600 to-teal-500 text-white";
  };

  // colorScheme={!status ? 'teal' : status == -1 ? 'orange' : status == -2 ? 'red' : 'gray'}
  return (
    <button
      className={` ${getClassNames()} ${
        size ? "text-" + size : ""
      } transition hover:bg-gradient-to-l hover:shadow-2xl focus:outline-none focus:ring-2 focus:ring-offset-2  duration-150 ease-in-out font-bold rounded  px-4 py-2 text-center items-center flex gap-2 `}
      {...rest}
    >
      {" "}
      {icon} {children}
    </button>
  );
}

export default AppButton;

export function HeadlessButton({
  children,
  icon,
  size,
  status,
  loadinglabel,
  type,
  loading,
  disabled,
  onClick,
  className, 
  editButton,
  deleteButton,
  addButton,
  full,
  ...rest
}: IAppButtonProps) {
  const getClassNames = () => {
    
    switch (status) {
      case 0:
        return "bg-gray-100 !text-gray-900";
      case -1:
        return "bg-[#fff9ee] font-extrabold text-[#ffb432] border-amber-500 text-sm hover:bg-orange-500 hover:text-white";
        
      case -2:
        return "bg-red-600";
 
      case 2:
        return "bg-green-600";
 

      default:
        return "";
    }
    
  };

  const statusColor = getClassNames(); 
  return (
    <Button type={type} as={Fragment} disabled={disabled || loading}>
      {({ hover, active, disabled }) => (
        <button
          onClick={ onClick } 
          className={clsx(
            className,
           
            `rounded  py-1 flex-nowrap text-nowrap font-bold w-fit px-4 border text-center h-fit flex items-center justify-center gap-2 hover:shadow-lg`,
            !hover && !active && `${statusColor} 600`,
            hover && !active && `${statusColor} 700 shadow-lg`,
            disabled && ` data-[disabled]:bg-gray-300`,
            active && `${statusColor} 600 shadow-md`,
            size == 'xs' && 'py-1 px-1', 
            size == 'lg' && 'py-2 px-8 text-lg',  
            editButton && 'bg-[#fff9ee] font-extrabold text-[#ffb432] border-amber-500 hover:bg-orange-500 hover:text-white',
            deleteButton && 'bg-[#ffe0e0] font-bold text-[#ff0000] border-red-500 hover:bg-red-500 hover:text-white',
            // addButton && 'bg-[#f4fffa] font-bold text-teal-400 border-teal-500 hover:bg-teal-500 hover:text-white',

            addButton && ' font-bold bg-teal-500 border-teal-400 hover:bg-teal-500 text-white hover:text-white',
            full && 'w-full'
          )}
        >
          {loading ? (
            <>
              <Spinner mr={3} /> {loadinglabel}
            </>
          ) : (
            children
          )}
        </button>
      )}
    </Button>
  );
}
