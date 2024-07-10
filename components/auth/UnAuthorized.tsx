import Link from 'next/link'
import React from 'react'

function UnAuthorized() {
  return ( 
        <div className="grid h-screen place-content-center bg-white px-4">
          <h1 className="uppercase tracking-widest text-gray-500">
            403 | UnAuthorized
          </h1>

          <Link href={'/'}>Go Home</Link>
          
        </div>
       
  )
}

export default UnAuthorized