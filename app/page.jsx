'use client'

import AllProducts from '@components/AllProducts'
import FeaturedProduct from '@components/FeaturedProduct'
import React from 'react'

const Page = () => {
    
    return (
        <div>
            <div>
                <FeaturedProduct />
                <AllProducts />
            </div>
        </div>
    )
}

export default Page