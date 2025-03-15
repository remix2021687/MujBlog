import { motion, AnimatePresence } from "motion/react"
import { useState } from "react"

export const GalleryPhoto = ({ id, name, photo }) => {
    const [selectPhotoID, setSelectPhotoID] = useState(null);
    
    const BlogBoxParant = {
        open: {
            scale: 1.03,
            transition: {
                duraction: 0.5,
                staggerChildren: 0.08,
                delayChildren: 0.1
            }
        },
        close: {
            transition: {
                duraction: 0.2,
                staggerChildren: 0.07,
                delayChildren: -1
            }
        }
    }

    const BlogBoxChildren = {
        open: {
            y: 0,
            opacity: 1
        },

        close: {
            y: -15,
            opacity: 0
        }
    }

    return (
        <>
            <motion.section 
                className="GalleryPhoto"
                layoutId={id}
                onClick={() => setSelectPhotoID(id)}
                variants={BlogBoxParant}
                initial='close'
                whileHover='open'
                whileTap={{scale: 0.80}}
                transition={{ease: 'easeInOut'}}
            >
                <img src={photo} alt={name} />
                <motion.h1 variants={BlogBoxChildren} >{name}</motion.h1>
            </motion.section>

            <AnimatePresence>
                {selectPhotoID && (
                    <motion.section
                        className="PreviewModalImage"
                        initial={{opacity: 0}}
                        animate={{opacity: 1}}
                        exit={{opacity: 0}}
                        onClick={() => setSelectPhotoID(null)}
                    >
                        <motion.section 
                            className="PreviewModalImage_bg"
                            // initial={{opacity: 0}}
                            // animate={{opacity: 1}}
                            // exit={{opacity: 0}}
                            layoutId={id}
                        >
                            <motion.img 
                                src={photo}
                            />
                        </motion.section>
                    </motion.section>
                )}
            </AnimatePresence>
        </>
    )
}