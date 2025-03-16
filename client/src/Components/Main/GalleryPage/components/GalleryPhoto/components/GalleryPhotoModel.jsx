import { motion } from "motion/react"
import { useState } from "react";

export const GalleryPhotoModel = ({ id, photo, onClose}) => {
    const [zoomImg, setZoomImg] = useState(1);

    const onWheelScroll = (event) => {

        if (event.ctrlKey) {
            const delta = event.deltaY
            if (delta < 0) {
                setZoomImg(zoomImg + 0.2)
            } else {
                setZoomImg(zoomImg - 0.2)
            }
        }
    }
    
    return (
        <motion.section
            className="GalleryPhotoModel"
            initial={{opacity: 0}}
            animate={{opacity: 1}}
            exit={{opacity: 0}}

            onWheel={(event) => {
                onWheelScroll(event)
            }}
            
        >
            <button onClick={onClose}><span>Close</span></button>   
            <motion.section 
                className="GalleryPhotoModel_bg"
                layoutId={id}
            >
                <motion.img 
                    drag
                    src={photo}
                    animate={{scale: zoomImg}}
                    
                />
            </motion.section>
        </motion.section>
    )
}