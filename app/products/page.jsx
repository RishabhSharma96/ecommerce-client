'use client'

import AllProducts from '@components/AllProducts'
import { useRouter } from 'next/navigation'
import React from 'react'

const Page = () => {

  const router = useRouter()

  let token = null ;
  if(typeof window !== 'undefined'){
    token = localStorage.getItem('token')
  }

  if (!token) {
    router.push("/login")
  }
  else {
    return (
      <div>
        <AllProducts />
      </div>
    )
  }
}

export default Page