'use client'

import React, { useState } from 'react'
import login from "@public/login.png"
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import axios from 'axios'
import { motion } from 'framer-motion'
import { toast } from 'react-hot-toast'

const Page = () => {

    const router = useRouter()

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const handleLogin = async () => {

        if(!email && !password){
            toast.error("Please fill all fields")
            return ;
        }

        await axios.post("/api/login", {
            email,
            password
        }).then((response) => {
            if (response.data.token) {
                router.push("/")
                toast.success("Login Successful!")
                localStorage.setItem('token', response.data.token)
                localStorage.setItem('userId', response.data.user[0]._id)
            }
        }).catch((err) => {
            toast.error("Credentials didn't match")
            console.log(err.message)
        })
    }

    return (
        <div>
            <div className='flex w-full h-full justify-center items-center md:ml-[-50px]'>

                <motion.div
                    transition={{ duration: 0.8 }}
                    initial={{ opacity: 0, x: "-400px" }}
                    animate={{ opacity: 1, x: "0px" }}
                    exit={{ opacity: 0, x: "-400px" }}
                    className='hidden md:flex h-screen justify-center items-center'>
                    <Image src={login} height={1000} width={1000}></Image>
                </motion.div>
                <motion.div 
                transition={{ duration: 0.8 }}
                initial={{ opacity: 0, x: "+400px" }}
                animate={{ opacity: 1, x: "0px" }}
                exit={{ opacity: 0, x: "+400px" }}
                className='mt-20 md:mt-0 h-full flex flex-col justify-center items-center gap-3 p-10'>
                    <span className="text-blue-950 font-extrabold text-3xl mb-7">Shop-It Login</span>
                    <span className='flex gap-3'>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 9v.906a2.25 2.25 0 01-1.183 1.981l-6.478 3.488M2.25 9v.906a2.25 2.25 0 001.183 1.981l6.478 3.488m8.839 2.51l-4.66-2.51m0 0l-1.023-.55a2.25 2.25 0 00-2.134 0l-1.022.55m0 0l-4.661 2.51m16.5 1.615a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V8.844a2.25 2.25 0 011.183-1.98l7.5-4.04a2.25 2.25 0 012.134 0l7.5 4.04a2.25 2.25 0 011.183 1.98V19.5z" />
                        </svg>
                        E-mail
                    </span>
                    <input className=" pl-6 min-w-[300px] w-[30%] h-[2.5rem] rounded-xl focus:outline-none border-2 border-gray-300" type="text"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        placeholder='Enter email'
                    />
                    <span className='flex gap-3'>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
                        </svg>

                        Password
                    </span>
                    <input className=" pl-6 min-w-[300px] w-[30%] h-[2.5rem] rounded-xl focus:outline-none border-2 border-gray-300 mb-2" type="password"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        placeholder='Enter password'
                    />
                    <button onClick={handleLogin} className="w-[95%] md:w-[80%] bg-blue-950 text-white font-bold h-[2.5rem] rounded-xl hover:border  hover:border-blue-950 hover:text-blue-950 hover:bg-white ease-in-out duration-300 flex justify-center items-center gap-4 hover:gap-7">Login</button>
                    <a className='w-[95%] md:w-[80%] bg-blue-950 text-white font-bold h-[2.5rem] rounded-xl hover:border  hover:border-blue-950 hover:text-blue-950 hover:bg-white ease-in-out duration-300 flex justify-center items-center gap-4 hover:gap-7' href="http://shopit-admin-rishabhsharma.netlify.app" ><button className="w-[100%] md:w-[100%] bg-blue-950 text-white font-bold h-[2.5rem] rounded-xl hover:border  hover:border-blue-950 hover:text-blue-950 hover:bg-white ease-in-out duration-300 flex justify-center items-center gap-4 hover:gap-7">Admin Login</button></a>
                    <span className='font-bold text-gray-500'>New Here? <span className='text-blue-600 cursor-pointer' onClick={() => router.push("/register")}>Register</span></span>
                </motion.div>

            </div>
        </div>
    )
}

export default Page