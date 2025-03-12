import { NavLink } from "react-router"
import { motion, useMotionValueEvent, useScroll } from 'motion/react';
import { useState } from "react";

export const Header = () => {
    const { scrollY } = useScroll();
    const [ scrollDuraction, setScrollDuraction ] = useState('down');

    useMotionValueEvent(scrollY,  "change", (current) => {
        const diff = current - scrollY.getPrevious();
        setScrollDuraction(diff > 0 ? 'down': 'up')
    })

    return (
        <motion.header 
            className="Header"
            animate={scrollDuraction == "down" ? {
                width: "50%",
                top: "10px",
                borderRadius: '8px',
                backgroundColor: 'red'
            }: {}}
        >
            <h1>Klaudie Blog</h1>
            <section className="Header_links">
                <NavLink>Home</NavLink>
                <NavLink>Blog</NavLink>
                <NavLink>About</NavLink>
            </section>
        </motion.header>
    )
}