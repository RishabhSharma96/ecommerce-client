'use client'

import { CartContext } from "@context/CartContext"
import axios from "axios"
import { motion } from "framer-motion"
import { useRouter, useSearchParams } from "next/navigation"
import { useContext, useEffect, useState } from "react"
import { toast } from "react-hot-toast"
import { ScaleLoader } from "react-spinners"
import Swal from "sweetalert2"


const Page = () => {

    const router = useRouter()

    const [orders, setOrders] = useState([])
    const [userData, setUserData] = useState([])

    var id = null

    if (typeof window !== 'undefined') {
        id = localStorage.getItem("userId")
    }

    const getData = async () => {
        await axios.get("/api/customer/" + id).then((response) => {
            setUserData(response.data[0])
        }).catch((err) => {
            console.log(err.message)
        })
    }

    useEffect(() => {
        getData()
    }, [])

    const getOrders = async () => {
        await axios.post("/api/orders", {
            email: userData.email
        }).then((response) => {
            setOrders(response.data)
        }).catch((err) => {
            console.log(err.message)
        })
    }

    const getpastorders = async () => {
        getOrders()
    }

    const handleLogout = () => {

        Swal.fire({
            title: 'Are You Sure?',
            text: 'Confirm Logout',
            showCancelButton: true,
            cancelButtonText: 'Return',
            confirmButtonText: 'Yes!',
            reverseButtons: true,
            confirmButtonColor: '#d55',
        }).then(async result => {
            if (result.isConfirmed) {
                localStorage.removeItem('token')
                localStorage.removeItem('userId')
                toast.success(`Logged out!!`)
                router.push("/login")
            }
        }).catch((err) => {
            console.log(err.message)
        })
    }

    const HandleDeleteAccount = async () => {
        Swal.fire({
            title: 'Confirm Account Deletion',
            text: "This action can't be undone",
            showCancelButton: true,
            cancelButtonText: 'Cancel',
            confirmButtonText: 'Yes, Delete!',
            reverseButtons: true,
            confirmButtonColor: '#d55',
        }).then(async result => {
            if (result.isConfirmed) {
                const id = localStorage.getItem('userId')
                localStorage.removeItem('token')
                localStorage.removeItem('userId')

                await axios.delete("/api/account/delete/" + id).catch((err) => {
                    console.log(err.message)
                })

                toast.success(`Account deleted!!`)
                router.push("/register")
            }
        }).catch((err) => {
            console.log(err.message)
        })
    }

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

    if (userData.length === 0) {
        return (
            <div className="flex justify-center items-center mt-7">
                <ScaleLoader color="blue" />
            </div>
        )
    }

    else {
        return (
            <div>
                <motion.div className="flex gap-4 justify-center ml-[2%] md:ml-0 mt-10 flex-col md:flex-row">
                    {orders.length === 0 && (
                        <div className="bg-gray-200 flex flex-col items-center justify-center w-[95%] md:w-[50%] min-w-[315px] p-2 pt-10 pb-10 md:p-6 md:pt-10 gap-1 rounded-xl">
                            <button onClick={getpastorders} className="w-[50%] md:w-[40%] bg-blue-950 text-white font-bold h-[2.5rem] rounded-xl hover:border  hover:border-blue-950 hover:text-blue-950 hover:bg-white ease-in-out duration-300 flex justify-center items-center gap-4 hover:gap-7">
                                Get Orders
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 ">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 4.5l7.5 7.5-7.5 7.5m-6-15l7.5 7.5-7.5 7.5" />
                                </svg>
                            </button>
                        </div>
                    )}
                    {orders.length > 0 && (
                        <motion.div
                            transition={{ duration: 0.8 }}
                            initial={{ opacity: 0, x: "-400px" }}
                            animate={{ opacity: 1, x: "0px" }}
                            exit={{ opacity: 0, x: "-400px" }}
                            className="bg-gray-200 flex flex-col items-center justify-center w-[95%] md:w-[50%] w-[310px] p-2 mr-2 pt-10 pb-10 md:p-6 md:pt-10 gap-1 rounded-xl">
                            <span className="text-blue-950 font-extrabold text-3xl mb-7">Past Orders</span>
                            <div className="flex items-center justify-center w-[95%] text-blue-950 font-extrabold text-xl mb-[1rem]">
                                <div className="w-[45%] xl:w-[40%] flex items-center justify-center">
                                    <div>
                                        Products
                                    </div>
                                </div>
                                <div className="w-[45%] xl:w-[40%] flex items-center justify-center">
                                    Address
                                </div>
                                <div className="hidden w-[30%] xl:flex items-center justify-center">
                                    E-mail
                                </div>

                            </div>


                            {orders.length > 0 && orders.map((product) => {
                                return (
                                    <div key={product._id} className="flex items-center justify-center w-[95%] mb-[1rem]">
                                        <div className="w-[45%] xl:w-[40%] items-center justify-center">
                                            <div className="bg-blend-multiply flex flex-col items-center justify-center mb-1 text-lg gap-1">

                                                {product.line_items.map((item) => {
                                                    return (
                                                        <span key={item.quantity * item.price_data.product_data.name} >{item.quantity} x {item.price_data.product_data.name}</span>
                                                    )
                                                })
                                                }

                                            </div>
                                        </div>
                                        <div className="w-[45%] xl:w-[40%] flex items-center justify-center">

                                            <span className="text-md">
                                                {product.address}
                                            </span>

                                        </div>
                                        <div className=" hidden w-[30%] xl:flex items-center justify-center text-lg">
                                            {product.email}
                                        </div>
                                    </div>
                                )
                            })}
                        </motion.div>)}
                    <motion.div
                        transition={{ duration: 0.8 }}
                        initial={{ opacity: 0, x: "+400px" }}
                        animate={{ opacity: 1, x: "0px" }}
                        exit={{ opacity: 0, x: "+400px" }}
                        className="bg-gray-200 flex flex-col items-center justify-center w-[100%] md:w-[25%] min-w-[320px] p-10 pb-6 gap-1 rounded-xl h-[20rem]">
                        <span className="text-blue-950 font-extrabold text-2xl md:text-3xl mb-5">Account Details</span>
                        <span className="rounded-xl w-[100%] md:w-[80%] m-1 pl-3 h-[2.2rem] focus:outline-none flex gap-3">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                            </svg>

                            <span>{userData.email}</span></span>

                        <span className="rounded-xl w-[100%] md:w-[80%] m-1 pl-3 focus:outline-none flex gap-3">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
                            </svg>

                            {userData.address}</span>
                        <span className="rounded-xl w-[95%] md:w-[80%] m-1 pl-3 h-[2.2rem] focus:outline-none flex gap-3">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                            </svg>


                            {userData.phoneNumber}</span>
                        <button onClick={handleLogout} className="w-[95%] md:w-[80%] bg-red-600 text-white font-bold h-[2.5rem] rounded-xl hover:border  hover:border-red-950 hover:text-red-950 hover:bg-white ease-in-out duration-300 flex justify-center items-center gap-4 hover:gap-7">
                            Logout
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 ">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 4.5l7.5 7.5-7.5 7.5m-6-15l7.5 7.5-7.5 7.5" />
                            </svg>
                        </button>

                        <button onClick={HandleDeleteAccount} className="w-[95%] md:w-[80%] bg-red-600 text-white font-bold h-[2.5rem] rounded-xl hover:border  hover:border-red-950 hover:text-red-950 hover:bg-white ease-in-out duration-300 flex justify-center items-center gap-4 hover:gap-7">
                            Delete Account
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 ">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 4.5l7.5 7.5-7.5 7.5m-6-15l7.5 7.5-7.5 7.5" />
                            </svg>
                        </button>


                    </motion.div>
                </motion.div>
            </div>
        )
    }
}

export default Page