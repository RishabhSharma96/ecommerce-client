import axios from "axios"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

const FeaturedProduct = () => {

    const [featuredProductData , setFeaturedProductData] = useState({})
    const [image, setimage] = useState('')
    const router = useRouter()

    useEffect(() => {
        const getData = async () => {
            await axios.get("/api/product/featured").then((response) => {
                console.log(response.data[0])
                setFeaturedProductData(response.data[0])
                setimage(response.data[0].productImages[0])
            }).catch((err) => {
                console.log(err.message)
            })
        }
        getData()
    },[])

    return (
        <div>
            <div className='bg-blue-950 flex flex-wrap-reverse pr-[6%] pl-[6%] pt-10 pb-10 text-white items-center justify-center'>
                <div className=" flex flex-col xl:p-10 md:w-[60%] p-2 w-full items-center xl:items-start gap-2">
                    <div className="text-[2rem] text-center font-extrabold flex gap-2 flex-col md:flex-row">
                        <span>⭐</span> <span>{featuredProductData.productName}</span>
                    </div>
                    <div className="xl:p-6 xl:pl-0 pt-4 text-[1.1rem] text-pink-200 flex text-center xl:text-left">
                        {featuredProductData.productDescription?.slice(0,250) +"..."}
                    </div>
                    <div className="flex flex-col sm:flex-row gap-4 mt-3 md:mt-0">

                        <button onClick={() => router.push(`/products/${featuredProductData._id}`)} className="h-[2.4rem] w-[150px] rounded-xl font-bold border-2 hover:bg-white hover:text-black ease-in-out duration-300">
                            Read More
                        </button>
                        <button className="h-[2.4rem] w-[150px] bg-white text-black rounded-xl ease-in-out duration-300  font-bold flex justify-center items-center gap-3">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 mt-[-3px]">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                            </svg>
                            Add to Cart
                        </button>
                    </div>
                </div>
                <div >
                    <img className="mb-3 bg-transparent h-[300px] w-[300px] mt-5 md:mt-0 object-contain rounded-xl mix-blend-lighten" src={image} alt="featured-product-image" />
                </div>
            </div>
        </div>
    )
}

export default FeaturedProduct