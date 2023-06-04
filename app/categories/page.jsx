'use client'

import { CartContext } from "@context/CartContext"
import axios from "axios"
import { useRouter } from "next/navigation"
import { useContext, useEffect, useState } from "react"

const Page = () => {

    const [productsdata, setproductsdata] = useState([])
    const [categoryData, setCategoryData] = useState([])
    const [filterCategory, setfilterCategory] = useState("")
    const router = useRouter()

    useEffect(() => {
        const getData = async () => {
            await axios.get("/api/product").then((response) => {
                console.log(response.data)
                setproductsdata(response.data)
            }).catch((err) => {
                console.log(err.message)
            })
        }
        getData()
    }, [])

    useEffect(() => {
        const getcData = async () => {
            await axios.get("/api/category").then((response) => {
                console.log(response.data)
                setCategoryData(response.data)
            }).catch((err) => {
                console.log(err.message)
            })
        }
        getcData()
    }, [])

    const { setCartProducts } = useContext(CartContext)

    const addToCart = (id) => {
        setCartProducts(prev => [...prev, id])
    }

    if (!localStorage.getItem('token')) {
        router.push("/login")
    }

    else {
        return (
            <div>
                <div className="flex item-center flex-wrap items-center w-full justify-center mt-4">
                    <div className="flex item-center flex-wrap flex-row w-full justify-center pt-2 pb-4 mb-2 gap-3 bg-blue-950 mt-[-17px]">
                        {categoryData.length > 0 && categoryData.map((category) => {
                            return (
                                <span onClick={() => {
                                    setfilterCategory(category.categoryName)
                                    console.log(filterCategory)
                                }} className="bg-white text-blue-950 pl-3 pr-3 rounded-md cursor-pointer font-bold">
                                    {category.categoryName}
                                </span>)
                        })}
                        <span onClick={() => setfilterCategory("")} className="bg-white text-blue-950 pl-3 pr-3 rounded-md cursor-pointer font-bold">
                            Clear Filters
                        </span>
                    </div>
                    <span className="font-extrabold text-4xl text-blue-900"> {"Categories"} </span>
                </div>

                <div>
                    {categoryData.length > 0 && categoryData.filter(ct => ct.categoryName.includes(filterCategory)).map((category) => {
                        return (
                            <div>
                                <div className="text-blue-950 font-extrabold text-3xl flex gap-3 items-center justify-center md:ml-6 md:justify-normal mt-6">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M5.25 8.25h15m-16.5 7.5h15m-1.8-13.5l-3.9 19.5m-2.1-19.5l-3.9 19.5" />
                                    </svg>


                                    {category.categoryName}
                                </div>
                                <div className="flex flex-wrap gap-3 items-center justify-center md:ml-6 md:justify-normal pt-7 pb-10 ">
                                    {productsdata !== [] && productsdata.filter(pdt => pdt.productCategory?.categoryName === category.categoryName).map((product) => {
                                        return (
                                            <div key={product._id} className="h-[320px] w-[320px] flex flex-col items-center justify-center rounded-2xl pb-3 bg-gray-100">
                                                <div className="p-8 pt-3 pl-12 h-[320px] w-[320px] object-contain">
                                                    <img className="h-[220px] w-[220px] object-contain rounded-2xl mix-blend-multiply" src={product.productImages[0]} alt="product-image" />
                                                </div>
                                                <div onClick={() => router.push(`/products/${product._id}`)} className="mt-[-80px] font-bold text-xl text-blue-800 cursor-pointer">
                                                    {product.productName}
                                                </div>
                                                <div className="flex justify-between items-center gap-14 mt-1">
                                                    <span className="font-extrabold text-xl">
                                                        ₹{product.productPrice}
                                                    </span>
                                                    <button onClick={() => addToCart(product._id)} className="w-[9rem] bg-blue-950 text-white rounded-xl flex p-2 font-bold gap-3 hover:text-blue-950 hover:border-blue-900 hover:bg-white">
                                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                                            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
                                                        </svg>
                                                        Add to Cart
                                                    </button>
                                                </div>
                                            </div>
                                        )
                                    })}
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
        )
    }
}

export default Page