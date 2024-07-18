 
import React, { ReactNode } from 'react'    
import AppIcon from './AppIcon/CommonIcon';
// import { IconName } from './AppIcon/icon-list';    
function LabelValueCard({label, value, iconName} : {
    label: string;
    value: any;
    iconName?: any;
}) { 
  return (
    <div className='flex flex-col justify-start items-start'>
        <div className='text-md font-extralight flex items-center gap-2'>{iconName ? <AppIcon name={iconName} /> : ''} {label}</div>
        <div className='text-lg font-bold'>
            {value}
        </div>
    </div>
  )
}

export default LabelValueCard