import { NavLink } from "react-router"
import { motion, useMotionValueEvent, useScroll } from 'motion/react';
import { useState } from "react";

import Logo from '../../../../../assets/img/kludieLogo.png'

export const Header = () => {
    const { scrollY } = useScroll();
    const [ scrollDuraction, setScrollDuraction ] = useState('up');

    useMotionValueEvent(scrollY,  "change", (current) => {
        const diff = current - scrollY.getPrevious();
        setScrollDuraction(diff > 0 ? 'down': 'up')
    })

    return (
        <motion.header 
            className="Header"
            transition={{
                ease: 'easeInOut'
            }}
            
            animate={scrollDuraction == "down" ? {
                width: "98%",
                top: '10px',
                borderRadius: '15px',
                boxShadow: '0px 0px 21px 7px rgba(0,0,0,0.2)'
            }: {}}
        >
            <NavLink to={'/'}>
                <img src={Logo} alt="Logo" width={350} />
            </NavLink>
            <section className="Header_links">
                <NavLink to={'/'}>Home</NavLink>
                <NavLink to={'/gallery'}>Gallery</NavLink>
            </section>
        </motion.header>
    )
}