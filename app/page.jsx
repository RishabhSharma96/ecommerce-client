'use client'

import AllProducts from '@components/AllProducts'
import FeaturedProduct from '@components/FeaturedProduct'
import { useRouter } from 'next/navigation'
import React, { useEffect } from 'react'

const Page = () => {

    const router = useRouter()

    if (!localStorage.getItem('token')) {
        router.push("/login")
    }
    else {
        return (
            <div>
                <div>
                    <FeaturedProduct />
                    <AllProducts />
                </div>
            </div>
        )
    }
}

export default Page