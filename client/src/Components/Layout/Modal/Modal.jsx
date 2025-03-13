import { motion } from "motion/react"

export const Modal = ({id, name, image, text, author, setReturnEvent}) => {
    
    const ModalAnimation = {
        open: {
            width: "95%",
            height: "95%",
            y: 0,

            transition: {
                when: "beforeChildren",
                duraction: 2.5,
                staggerChildren: 0.1,
            }
        },
        close: {
            width: "5%",
            height: "5%",
            y: -100,

            transition: {
                duraction: 2.5,
                staggerChildren: 0.1,
                when: "afterChildren",
            }
        },

    }

    const ModalAnimationChildren = {
        open: {
            y: 0,
            opacity: 1,
            
        },
        close: {
            y: -15,
            opacity: 0,
        }
    }


    const ClickHendler = (event) => {
        setReturnEvent(event)
    }

    return (
        <motion.section 
            className="Modal"
            variants={ModalAnimation}
            initial='close'
            animate='open'
            exit='close'
            transition={{
                ease:'easeInOut'
            }}
        >
            <section className="Modal_left">
                <motion.img variants={ModalAnimationChildren} src={image} />
                <section className="Modal_lefr_header">
                    <motion.h1 variants={ModalAnimationChildren}>{name}</motion.h1>
                    <motion.p variants={ModalAnimationChildren}>{text}</motion.p>
                </section>
            </section>
            <section className="Modal_right">
                <motion.section variants={ModalAnimationChildren} className="Modal_right_presonal">
                    <section>
                        <h1>Auhor by</h1>
                        <h3>Maksym Yeromin</h3>
                    </section>
                    <motion.button variants={ModalAnimationChildren} onClick={ClickHendler}>Close</motion.button>
                </motion.section>
                <motion.h4 variants={ModalAnimationChildren}><span>Created by</span> 03.02.2025</motion.h4>
            </section>
        </motion.section>
    )
}