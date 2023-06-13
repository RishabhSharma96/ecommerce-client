'use client'

import AllProducts from '@components/AllProducts'
import { useRouter } from 'next/navigation'
import React, { useEffect } from 'react'

const Page = () => {

  const router = useRouter()

  let token = null;
  if (typeof window !== 'undefined') {
    token = localStorage.getItem('token')
  }

  useEffect(() => {
    const routeToLogin = () => {
      if (!token) {
        router.push("/login")
      }
    }
    routeToLogin()
  }, [])

  return (
    <div>
      <AllProducts />
    </div>
  )
}

export default Page