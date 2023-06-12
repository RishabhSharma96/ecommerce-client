'use client'

import { CartContext } from '@context/CartContext'
import axios from 'axios'
import { motion } from 'framer-motion'
import React, { useContext, useEffect, useState } from 'react'
import { toast } from 'react-hot-toast'
import { ScaleLoader } from 'react-spinners'

const Page = ({ params }) => {

    const productID = params.id

    const [product, setProduct] = useState({})
    const [productImageArray, setProductImageArray] = useState([])
    const [activeImage, setActiveImage] = useState(0)
    const [comment, setComment] = useState("")

    const getInfo = async () => {
        await axios.get("/api/product/" + productID).then((response) => {
            setProduct(response.data[0]);
            setProductImageArray(response.data[0].productImages)
        }).catch((err) => {
            console.log(err.message)
        })
    }
    useEffect(() => {
        getInfo()
    }, [])

    const AddComment = async () => {
        console.log(productID)
        await axios.patch("/api/product/comment/" + productID, {
            comment: comment
        }).then((response) => {
            console.log(response.data)
            setComment("")
        }).catch((err) => {
            console.log(err.message)
        })
        getInfo()
    }

    const { setCartProducts } = useContext(CartContext)

    const addToCart = (id,name) => {
        setCartProducts(prev => [...prev, id])
        toast.success(`${name} added to cart`)
    }

    if (productImageArray.length === 0) {
        return (
            <div className="flex justify-center items-center mt-7">
                <ScaleLoader color="blue" />
            </div>
        )
    }

    else {
        return (
            <div className='flex flex-col md:flex-row justify-center items-center md:items-start mt-3 gap-2'>
                <motion.div
                    transition={{ duration: 0.8 }}
                    initial={{ opacity: 0, x: "-400px" }}
                    animate={{ opacity: 1, x: "0px" }}
                    exit={{ opacity: 0, x: "-400px" }}
                    className='bg-gray-200 w-[320px] flex justify-center flex-col items-center gap-4 rounded-xl pb-5 pt-5'>
                    <img className='w-[310px] mix-blend-multiply mb-3' src={productImageArray[activeImage]} alt="" />
                    <div className='flex gap-[3px]'>
                        <img onClick={() => setActiveImage(0)} className='w-[75px] mix-blend-multiply' src={productImageArray[0]} alt="" />
                        <img onClick={() => setActiveImage(1)} className='w-[75px] mix-blend-multiply' src={productImageArray[1]} alt="" />
                        <img onClick={() => setActiveImage(2)} className='w-[75px] mix-blend-multiply' src={productImageArray[2]} alt="" />
                        <img onClick={() => setActiveImage(3)} className='w-[75px] mix-blend-multiply' src={productImageArray[3]} alt="" />
                    </div>
                </motion.div>
                <motion.div 
                transition={{ duration: 0.8 }}
                initial={{ opacity: 0, x: "+400px" }}
                animate={{ opacity: 1, x: "0px" }}
                exit={{ opacity: 0, x: "+400px" }}
                className='bg-gray-200 min-w-[320px] w-[50%] flex flex-col rounded-xl p-3'>
                    <p className='text-center text-blue-950 font-extrabold text-4xl mt-2 mb-3'>{product.productName}</p>
                    <p className='text-gray-700 p-4 text-lg'>{product.productDescription}</p>
                    <div className='p-4 flex justify-between flex-wrap gap-3'>
                        <span className='font-extrabold text-gray-800 text-2xl '>Price : <span className='text-gray-700'>₹{product.productPrice}</span></span>
                        <button onClick={() => addToCart(product._id,product.productName)} className="w-[9rem] bg-blue-950 text-white rounded-xl flex p-2 font-bold gap-3 hover:text-blue-950 hover:border-blue-900 hover:bg-white">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
                            </svg>
                            Add To Cart</button>
                    </div>
                    <div className='flex flex-col items-center pb-3'>
                        <span className='text-2xl text-gray-600 mt-3 mb-3 font-extrabold'>Reviews</span>
                        <div className='mb-3'>
                            <input
                                type="text"
                                placeholder='Write a review'
                                value={comment}
                                onChange={(e) => setComment(e.target.value)}
                                className='focus:outline-none pl-2 rounded-md w-[11rem] h-[2rem]'
                            />
                            <button onClick={AddComment}
                                className='focus:outline-none rounded-md w-[7rem] h-[2rem] bg-blue-950 text-white font-bold ml-2'
                            >Add Review</button>
                        </div>
                        {product && product?.reviews?.map((comment, index) => {
                            return (
                                <div className='flex flex-col gap-1 items-start'>
                                    <div className='flex w-[300px] justify-start pl-3'>
                                        <span className='text-gray-600 font-bold'>{index + 1}.&nbsp;</span><span className='text-blue-950'>{comment}</span>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </motion.div>
            </div>
        )
    }
}

export default Page