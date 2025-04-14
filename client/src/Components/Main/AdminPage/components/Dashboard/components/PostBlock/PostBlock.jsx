import { motion, AnimatePresence } from "motion/react"
import { useState } from "react";
import { DropmenuInfoPost } from "./components/DropmenuInfoPost";

export const PostBlock = ({id, index, name, photo, isPined, dateCreated, childAnimation }) => {
    const [isOpen, setIsOpen] = useState(false);
    
    return (
        <>
            <motion.section 
                className="PostBlock"
                whileHover={{
                    boxShadow: '8px 7px 9px 11px rgba(0,0,0,0.11)'
                }}
                custom={index}
                variants={childAnimation}
                onClick={() => {setIsOpen(isOpen => !isOpen)}}
            >
                <section className="PostBlock_info">
                    <img src={photo} alt={name} />
                    <section className="PostBlock_info_name_pin">
                        <h2>{name}</h2>
                        {isPined ? <span>pined</span>: null}
                    </section>
                </section>

                <h2>{dateCreated}</h2>

            </motion.section>
            
            <AnimatePresence>
                {
                    isOpen && <DropmenuInfoPost id={id} />
                }
            </AnimatePresence>
        </>
    )
}