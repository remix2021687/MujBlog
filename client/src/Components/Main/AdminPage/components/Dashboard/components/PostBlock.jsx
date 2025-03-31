import { motion } from "motion/react"

export const PostBlock = ({id, index, name, photo, dateCreated, childAnimation }) => {
    return (
        <motion.section 
            className="PostBlock"
            whileHover={{
                boxShadow: '8px 7px 9px 11px rgba(0,0,0,0.11)'
            }}
            custom={index}
            variants={childAnimation}
        >
            <section className="PostBlock_info">
                <img src={photo} alt={name} />
                <h2>{name}</h2>
            </section>

            <h2>{dateCreated}</h2>

        </motion.section>
    )
}