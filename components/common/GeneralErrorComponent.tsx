 
import { GENERAL_ERROR_MESSAGE } from '@/utils/constants';
import { Button } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import React from 'react'

function GeneralErrorComponent(props: {error?: string, onTryAgain?: any}) {
  const {error, onTryAgain} = props;
  const router = useRouter()
  return (
    <div className="flex flex-col gap-4 justify-center items-center h-full min-h-96 w-full">
     <h1>{error ?? GENERAL_ERROR_MESSAGE}</h1>
     <Button onClick={() => onTryAgain ?  onTryAgain() : router.reload()}>Try Again</Button>
     
</div>
  )
}

export default GeneralErrorComponent