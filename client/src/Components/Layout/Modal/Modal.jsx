import { motion } from "motion/react"
import { useEffect } from "react"
import { GetPostSelf } from "../../../Axios/AxiosInit"
import { useState } from "react"
import moment from "moment/moment"

export const Modal = ({id, setReturnEvent}) => {
    const [data, setData] = useState([]);

    const formateData = moment(data.date_created).format("D.MM.YYYY")
    
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

    useEffect(() => {
        GetPostSelf(id)
        .then((res) => {
            setData(res.data)
            console.log(data);
        })
        .catch((err) => {
            console.error(err);
            setData(false)
            setReturnEvent(false);
        })

    }, [])

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
                <motion.img variants={ModalAnimationChildren} src={data.photo} />
                <section className="Modal_lefr_header">
                    <motion.h1 variants={ModalAnimationChildren}>{data.name}</motion.h1>
                    <motion.p variants={ModalAnimationChildren}>{data.text}</motion.p>
                </section>
            </section>
            <section className="Modal_right">
                <motion.section variants={ModalAnimationChildren} className="Modal_right_presonal">
                    <section>
                        <h1>Auhor by</h1>
                        <h3>{data.author?.last_name} {data.author?.first_name}</h3>
                    </section>
                    <motion.button variants={ModalAnimationChildren} onClick={ClickHendler}>Close</motion.button>
                </motion.section>
                <motion.h4 variants={ModalAnimationChildren}><span>Created by</span> {formateData}</motion.h4>
            </section>
        </motion.section>
    )
}