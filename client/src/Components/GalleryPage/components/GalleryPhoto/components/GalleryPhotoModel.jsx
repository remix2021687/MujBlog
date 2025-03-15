import { motion } from "motion/react"
import { useState } from "react"

export const GalleryPhotoModel = ({ id, photo, onClose}) => {
    
    return (
        <motion.section
            className="PreviewModalImage"
            initial={{opacity: 0}}
            animate={{opacity: 1}}
            exit={{opacity: 0}}
            onClick={onClose}
        >
            <motion.section 
                className="PreviewModalImage_bg"
                layoutId={id}
            >
                <motion.img 
                    src={photo}
                />
            </motion.section>
        </motion.section>
    )
}