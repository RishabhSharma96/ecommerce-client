'use client'

import Navbar from "@components/Navbar"
import { CartContextProvider } from "@context/CartContext"
import "@styles/globals.css"
import { usePathname } from "next/navigation"
import { createGlobalStyle } from "styled-components"
import { Toaster } from "react-hot-toast"

const GlobalStyles = createGlobalStyle`
@import url('https://fonts.googleapis.com/css2?family=Poppins&display=swap');

*{
    font-family: 'Poppins', sans-serif;
}
`

export const metadata = {
    title: "Shop-It"
}

const RootLayout = ({ className, children }) => {

    const pathname = usePathname()

    return (
        <html>
            <GlobalStyles />
            <body>
                <div className='overflow-hidden'>
                    <CartContextProvider>
                        <Toaster
                            position="top-right"
                        />
                        {pathname === "/login" || pathname === '/register' ? "" : <Navbar />}
                        {children}
                    </CartContextProvider>
                </div>
            </body>
        </html>
    )
}

export default RootLayout