'use client'

import { CartContext } from "@context/CartContext"
import axios from "axios"
import { useRouter, useSearchParams } from "next/navigation"
import { useContext, useEffect, useState } from "react"


const Page = () => {

    const router = useRouter()
    const searchParams = useSearchParams()
    const success = searchParams.get('success')
    const failure = searchParams.get('cancelled')

    const { cartProducts, setCartProducts } = useContext(CartContext)
    const [productsData, setProductsdata] = useState([])
    const [userData, setUserData] = useState({
        name: "",
        email: "",
        city: "",
        pin: "",
        address: "",
        country: ""
    })

    const incrementQty = (id) => {
        setCartProducts(prev => [...prev, id])
    }

    const decrementQty = (id) => {
        setCartProducts(prev => {
            const position = prev.indexOf(id)
            if (position != -1) {
                return prev.filter((value, index) => index !== position)
            }
            return prev
        })
    }

    useEffect(() => {

        const getCartProducts = async () => {
            if (cartProducts?.length > 0) {
                await axios.post("/api/cart", {
                    ids: cartProducts
                }).then((response) => {
                    console.log(response)
                    setProductsdata(response.data)
                }).catch((err) => {
                    console.log(err.message)
                })
            }
        }
        getCartProducts()
    }, [cartProducts])

    const handleCheckkout = async () => {
        const ids = cartProducts.join(",")

        await axios.post("/api/checkout", {
            name: userData.name,
            email: userData.email,
            pin: userData.pin,
            city: userData.city,
            address: userData.address,
            country: userData.country,
            products: ids
        }).then((response) => {
            window.location = response.data
        }).catch((err) => {
            console.log(err.message)
        })
    }

    return (
        <div>
            <div className="flex gap-4 justify-center ml-[2%] md:ml-0 mt-10 flex-col md:flex-row">
                {cartProducts.length === 0 && (
                    <div className="bg-gray-200 flex flex-col items-center justify-center w-[95%] md:w-[50%] min-w-[315px] p-2 pt-10 pb-10 md:p-6 md:pt-10 gap-1 rounded-xl">
                        <span className="text-blue-950 font-extrabold text-3xl mb-7">Cart is Empty</span>
                    </div>
                )}
                {cartProducts.length > 0 && (<div className="bg-gray-200 flex flex-col items-center justify-center w-[95%] md:w-[50%] min-w-[315px] p-2 pt-10 pb-10 md:p-6 md:pt-10 gap-1 rounded-xl">

                    <div className="flex items-center justify-center w-[95%] text-blue-950 font-extrabold text-xl mb-[1rem]">
                        <div className="w-[40%] flex items-center justify-center">
                            <div>
                                Products
                            </div>
                        </div>
                        <div className="w-[30%] flex items-center justify-center">
                            Quantity
                        </div>
                        <div className="w-[30%] flex items-center justify-center">
                            Price
                        </div>
                    </div>


                    {productsData.length > 0 && productsData.map((product) => {
                        return (
                            <div className="flex items-center justify-center w-[95%] mb-[1rem]">
                                <div className="w-[40%] items-center justify-center">
                                    <div className="bg-blend-multiply flex items-center justify-center mb-1">
                                        <img className="h-32 w-32 bg-blend-multiply" src={product.productImages[0]} alt="" />
                                    </div>
                                    <div>
                                        <span className="text-lg font-extrabold text-blue-900 flex items-center justify-center text-center">{product.productName}</span>
                                    </div>
                                </div>
                                <div className="w-[30%] flex items-center justify-center">
                                    <button onClick={() => decrementQty(product._id)} className="h-7 w-9 rounded-md bg-white font-bold text-xl m-3">-</button>
                                    <span className="text-xl"> {cartProducts.filter(id => id === product._id).length} </span>
                                    <button onClick={() => incrementQty(product._id)} className="h-7 w-9 rounded-md bg-white font-bold text-xl m-3">+</button>
                                </div>
                                <div className="w-[30%] flex items-center justify-center text-xl">
                                    ₹{cartProducts.filter(id => id === product._id).length * product.productPrice}
                                </div>
                            </div>
                        )
                    })}

                </div>)}
                <div className="bg-gray-200 flex flex-col items-center justify-center w-[95%] md:w-[40%] min-w-[320px] p-10 gap-1 rounded-xl h-[30rem]">
                    <span className="text-blue-950 font-extrabold text-3xl mb-7">Order Details</span>
                    <input
                        type="text"
                        value={userData.name}
                        onChange={(e) => setUserData({ ...userData, name: e.target.value })}
                        placeholder="Enter Your Name"
                        className="border-2 border-gray-400 rounded-xl w-[95%] md:w-[80%] m-1 pl-3 h-[2.2rem] focus:outline-none"
                    />
                    <input
                        type="email"
                        value={userData.email}
                        onChange={(e) => setUserData({ ...userData, email: e.target.value })}
                        placeholder="Enter Your Email"
                        className="border-2 border-gray-400 rounded-xl w-[95%] md:w-[80%] m-1 pl-3 h-[2.2rem] focus:outline-none"
                    />
                    <div className="w-[100%] flex items-center justify-center">
                        <input
                            type="text"
                            value={userData.city}
                            onChange={(e) => setUserData({ ...userData, city: e.target.value })}
                            placeholder="Enter City"
                            className="border-2 border-gray-400 rounded-xl w-[47%] md:w-[39%] m-1 pl-3 h-[2.2rem] focus:outline-none"
                        />
                        <input
                            type="number"
                            value={userData.pin}
                            onChange={(e) => setUserData({ ...userData, pin: e.target.value })}
                            placeholder="Enter PIN"
                            className="border-2 border-gray-400 rounded-xl w-[47%] md:w-[39%] m-1 pl-3 h-[2.2rem] focus:outline-none"
                        />
                    </div>
                    <input
                        type="text"
                        value={userData.address}
                        onChange={(e) => setUserData({ ...userData, address: e.target.value })}
                        placeholder="Enter Shipping Address"
                        className="border-2 border-gray-400 rounded-xl w-[95%] md:w-[80%] m-1 pl-3 h-[2.2rem] focus:outline-none"
                    />
                    <input
                        type="text"
                        value={userData.country}
                        onChange={(e) => setUserData({ ...userData, country: e.target.value })}
                        placeholder="Enter Country"
                        className="border-2 border-gray-400 rounded-xl w-[95%] md:w-[80%] m-1 pl-3 h-[2.2rem] focus:outline-none"
                    />
                    <button onClick={handleCheckkout} className="w-[95%] md:w-[80%] bg-blue-950 text-white font-bold h-[2.5rem] rounded-xl hover:border  hover:border-blue-950 hover:text-blue-950 hover:bg-white ease-in-out duration-300 flex justify-center items-center gap-4 hover:gap-7">
                        Place Order
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 ">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 4.5l7.5 7.5-7.5 7.5m-6-15l7.5 7.5-7.5 7.5" />
                        </svg>

                    </button>
                </div>
            </div>
        </div>
    )
}

export default Page