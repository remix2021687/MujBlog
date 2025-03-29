import { motion } from "motion/react"

export const InfoBlocks = ({ name, count, icon, colorIcon, BgColorIcon, childAnimation}) => {
    return (
        <motion.section 
            className="InfoBlocks"
            variants={childAnimation}
        >
            <section className="InfoBlocks_details">
                <h3>Total {name}</h3>
                <h1>{count}</h1>
            </section>
            <section className="InfoBlocks_icon" style={{
                backgroundColor: BgColorIcon,
                color: colorIcon
            }}>
                {icon}
            </section>
        </motion.section>
    )
}