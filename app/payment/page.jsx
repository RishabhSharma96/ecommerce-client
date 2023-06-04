'use client'

import React, { useContext, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import { CartContext } from '@context/CartContext'

const Page = () => {

    const searchParams = useSearchParams()
    const { setCartProducts } = useContext(CartContext)

    const success = searchParams.get('success')
    const failure = searchParams.get('cancelled')

    useEffect(() => {
        const emptyCart = () => {
            if (success) {
                setCartProducts([])
                localStorage.removeItem('cart')
            }
        }
        emptyCart()
    }, [])


    if (success) {
        return (
            <div>
                successful
            </div >
        )
    }
    if (failure) {
        return (
            <div>
                failed
            </div >
        )
    }
}

export default Page