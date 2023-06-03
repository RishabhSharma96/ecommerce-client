'use client'

import Navbar from "@components/Navbar"
import { CartContextProvider } from "@context/CartContext"
import "@styles/globals.css"
import { createGlobalStyle } from "styled-components"

const GlobalStyles = createGlobalStyle`
@import url('https://fonts.googleapis.com/css2?family=Poppins&display=swap');

*{
    font-family: 'Poppins', sans-serif;
}
`

const RootLayout = ({ className, children }) => {
    return (
        <html>
            <GlobalStyles />
            <body>
                <div className='overflow-hidden'>
                    <CartContextProvider>
                        <Navbar />
                        {children}
                    </CartContextProvider>
                </div>
            </body>
        </html>
    )
}

export default RootLayout