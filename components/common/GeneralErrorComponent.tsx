 
import { GENERAL_ERROR_MESSAGE } from '@/utils/constants';
import { Button } from '@chakra-ui/react';
import React from 'react'

function GeneralErrorComponent(props: {error?: string, onTryAgain?: any}) {
  const {error, onTryAgain} = props;
  return (
    <div className="flex flex-col gap-4 justify-center items-center h-full">
     <h1>{error ?? GENERAL_ERROR_MESSAGE}</h1>
     {
      onTryAgain && <Button onClick={() => onTryAgain()}>Try Again</Button>
     }
</div>
  )
}

export default GeneralErrorComponent