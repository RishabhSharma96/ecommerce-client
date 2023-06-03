import axios from "axios"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

const AllProducts = () => {

    const [productsdata, setproductsdata] = useState([])
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

    return (
        <div className="flex items-center flex-col pt-6">
            <span className="font-extrabold text-4xl text-blue-900">New Arrivals</span>
            <div className="flex flex-wrap gap-3 items-center justify-center pt-10 pb-10 ">
                {productsdata.length > 0 && productsdata.map((product) => {
                    return (
                        <div className="h-[320px] w-[320px] flex flex-col items-center justify-center rounded-2xl pb-3 bg-gray-100">

                            <div className="p-8 pt-3 pl-12 h-[320px] w-[320px] object-contain">
                                <img className="h-[220px] w-[220px] object-contain rounded-2xl mix-blend-multiply" src={product.productImages[0]} alt="product-image" />
                            </div>
                            <div onClick={() => router.push(`/products/${product._id}`)} className="mt-[-80px] font-bold text-xl text-blue-800 cursor-pointer">
                                {product.productName}
                            </div>
                            <div className="flex justify-between items-center gap-16 mt-1">
                                <span className="font-extrabold">
                                    ₹{product.productPrice}
                                </span>
                                <button className="w-[9rem] bg-blue-950 text-white rounded-xl flex p-2 font-bold gap-3 hover:text-blue-950 hover:border-blue-900 hover:bg-white">
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
}

export default AllProducts