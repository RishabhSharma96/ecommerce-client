'use client'

import Image from 'next/image'
import logo from "@public/logo.png"
import styled from 'styled-components'
import Link from 'next/link';
import { usePathname, useRouter } from "next/navigation"
import { useContext, useState } from 'react';
import { CartContext } from '@context/CartContext';
import { motion } from 'framer-motion';

const StyledNavbar = styled.div`
    width: 100vw;
    display: flex;
    height: 4.5rem;
    padding: 4px 6%;
    justify-content: space-between;
`;


const Navbar = () => {

    const router = useRouter()
    const pathname = usePathname()

    const [showNav, setShowNav] = useState(false)

    const { cartProducts } = useContext(CartContext)

    const activeLinkStyles = 'bg-white text-blue-950 p-2 pr-4 pl-4 rounded-2xl'

    const togglestyles = "relative flex flex-col w-full relative gap-6 bg-blue-950 h-screen z-10 left-0 pt-5 ml-[-15rem] ease-in-out duration-300 top-16"

    return (
        <div>
            <StyledNavbar className='bg-blue-950'>
                <Link href="/"><div className='flex h-[4rem] items-center'>
                    <Image src={logo} height={15} width={70} alt="company=logo" />
                    <span className='text-white font-extrabold text-xl'>SHOP-IT</span>
                </div>
                </Link>
                <div className={showNav ? "md:flex h-[4rem] items-center text-white font-bold text-left " + togglestyles : "hidden md:flex h-[4rem] items-center text-white gap-4 font-bold pl-[4%] pb-[10px] pt-[16px] -right-full"}>
                    <Link className={pathname === "/" ? activeLinkStyles : ""} href="/"> Home</Link>
                    <Link className={pathname === "/products" ? activeLinkStyles : ""} href="/products"> All Products</Link>
                    <Link className={pathname === "/categories" ? activeLinkStyles : ""} href="/categories"> Categories</Link>
                    <Link className={pathname === "/account" ? activeLinkStyles : ""} href="/account"> Account</Link>
                    <Link className={pathname === "/cart" ? activeLinkStyles : ""} href="/cart"> Cart ({cartProducts.length})</Link>
                </div>
                <div className='flex md:hidden pt-[10px]'>
                    <svg onClick={() => setShowNav(!showNav)} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-10 text-white">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                    </svg>
                </div>
            </StyledNavbar>
        </div>
    )
}

export default Navbar