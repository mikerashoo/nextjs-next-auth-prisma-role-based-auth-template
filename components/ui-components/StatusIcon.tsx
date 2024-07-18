import React from 'react'

function StatusIcon({isActive}: {isActive: boolean}) {
  return (
   <div className='flex w-fit flex-row items-center'>
     <div
    className={`h-2.5 w-2.5 rounded-full ${
     isActive
        ? "bg-green-500"
        : "bg-red-500"
    } me-2`}
  ></div> {isActive ? "active" : "inactive"}
   </div>
   
  )
}

export default StatusIcon