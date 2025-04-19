import { motion } from "motion/react"
import { useState } from "react";

export const PostBlock = ({id, index, name, photo, isPined, dateCreated, childAnimation }) => {
    const [isOpen, setIsOpen] = useState(false);
    
    return (
        <>
            <motion.section 
                className="PostBlock"
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
        </>
    )
}