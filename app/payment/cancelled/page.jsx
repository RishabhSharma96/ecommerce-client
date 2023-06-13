'use client'

import React, { useContext, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { CartContext } from '@context/CartContext'
import axios from 'axios'
import { toast } from 'react-hot-toast'

const Page = () => {

    const searchParams = useSearchParams()
    const router = useRouter()

    const id = searchParams.get('id')

    useEffect(() => {
        toast.error("Payment Failed")
    }, [])

    useEffect(() => {
        const deleteItem = async () => {
            await axios.delete(`/api/checkout/cancelled/${id}`).then((response) => {
            }).catch((err) => {
                console.log(err.message)
            })
        }
        deleteItem()
    }, [])

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
            <div className='h-[90vh] w-full flex items-center justify-center overflow-hidden'>
                <div className='bg-gray-200 h-[25rem] w-[40%] min-w-[300px] rounded-2xl flex flex-col items-center justify-center gap-7 p-5'>
                    <div className='bg-red-300 h-[15rem] w-[14rem] rounded-full flex flex-col items-center justify-center border-2 border-dashed border-red-500'>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-[10rem] h-[10rem] text-red-600 ">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>

                    </div>
                    <div className='text-center font-extrabold text-xl text-gray-600'>
                        Ooops!! it seems something went wrong. No worries keep shopping with Shop-It
                    </div>
                </div>
            </div>
        </div >
    )
}

export default Page