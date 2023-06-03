'use client'

import Image from 'next/image'
import logo from "@public/logo.png"
import styled from 'styled-components'
import Link from 'next/link';
import { usePathname, useRouter } from "next/navigation"

const StyledNavbar = styled.div`
    width: 100vw;
    display: flex;
    height: 4rem;
    padding: 0 6%;
    padding-top: 10px;
    justify-content: space-between;
`;


const Navbar = () => {

    const router = useRouter()
    const pathname = usePathname()

    const activeLinkStyles = 'bg-white text-blue-950 p-2 pr-4 pl-4 rounded-2xl'

    return (
        <div>
            <StyledNavbar className='bg-blue-950'>
                <Link href="/"><div className='flex h-[4rem] items-center'>
                    <Image src={logo} height={15} width={70} alt="company=logo" />
                    <span className='text-white font-extrabold text-xl'>SHOP-IT</span>
                </div>
                </Link>
                <div className='flex h-[4rem] items-center text-white gap-4 font-bold'>
                    <Link className={ pathname === "/" ? activeLinkStyles : "" } href="/"> Home</Link>
                    <Link className={ pathname === "/products" ? activeLinkStyles : "" } href="/products"> All Products</Link>
                    <Link className={ pathname === "/categories" ? activeLinkStyles : "" }  href="/categories"> Categories</Link>
                    <Link className={ pathname === "/account" ? activeLinkStyles : "" }  href="/account"> Account</Link>
                    <Link className={ pathname === "/cart" ? activeLinkStyles : "" }  href="/cart"> Cart (0)</Link>
                </div>
            </StyledNavbar>
        </div>
    )
}

export default Navbar