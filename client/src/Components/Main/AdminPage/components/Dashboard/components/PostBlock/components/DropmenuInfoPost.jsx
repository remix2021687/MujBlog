import examplePhoto from "../../../../../../../../assets/img/examplePhoto.jpg"
import { motion } from "motion/react"

export const DropmenuInfoPost = ({ name, photo, DisplayDescription, text }) => {
    return (
        <motion.section 
            className="DropmenuInfoPost"
            
        >
            <img src={photo} alt='photo' />
            <section className="DropmenuInfoPost_header">
                <h1>{name}</h1>
                <p>{DisplayDescription}</p>
            </section>
            <p>{text}</p>
        </motion.section>
    )
}