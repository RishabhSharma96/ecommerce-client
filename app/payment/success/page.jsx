'use client'

import React, { useContext, useEffect } from 'react'
import { CartContext } from '@context/CartContext'
import { useRouter } from 'next/navigation'
import { toast } from 'react-hot-toast'

const Page = () => {

    const { setCartProducts } = useContext(CartContext)
    const router = useRouter()

    useEffect(()=>{
        toast.success("Order placed")
    },[])

    useEffect(() => {
        const emptyCart = () => {
            setCartProducts([])
            localStorage.removeItem('cart')
        }
        emptyCart()
    }, [])

    if (!localStorage.getItem('token')) {
        router.push("/login")
    }
    else {
        return (
            <div>
                <div className='h-[90vh] w-full flex items-center justify-center overflow-hidden'>
                    <div className='bg-gray-200 h-[25rem] w-[40%] min-w-[300px] rounded-2xl flex flex-col items-center justify-center gap-7 p-5'>
                        <div className='bg-green-300 h-[15rem] w-[14rem] rounded-full flex flex-col items-center justify-center border-2 border-dashed border-green-500'>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-[10rem] h-[10rem] text-green-600 ">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                            </svg>
                        </div>
                        <div className='text-center font-extrabold text-xl text-gray-600'>
                            WooHoooooo Your Order is on the way. Shop more with Shop-it
                        </div>
                    </div>
                </div>
            </div >
        )
    }

}

export default Page