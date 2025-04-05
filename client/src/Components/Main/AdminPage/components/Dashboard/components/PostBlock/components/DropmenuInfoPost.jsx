import examplePhoto from "../../../../../../../../assets/img/examplePhoto.jpg"
import { useEffect, useState } from "react"
import { motion } from "motion/react"
import { GetPostAdmin } from "../../../../../../../../Axios/AxiosInit"


export const DropmenuInfoPost = ({ id }) => {
    const [data, setData] = useState([]);

    useEffect(() => {
        GetPostAdmin(id)
        .then((res) => {
            if (res) {
                setData(res.data);
            }
        })
        .catch(() => {
            setData()
        })
    }, [])

    const DropmenuInfoPostParent = {
        open: {
            opacity: 1,
            y: 0,

            transition: {
                duraction: 0.5,
                staggerChildren: 0.08,
                delayChildren: 0.1
            }
        },

        close: {
            opacity: 0,
            y: -15
        }
    }

    const DropmenuInfoPostChild = {
        open: {
            opacity: 1,
            y: 0,
        },

        close: {
            opacity: 0,
            y: -15
        }
    }

    return (
        <motion.section 
            className="DropmenuInfoPost"
            variants={DropmenuInfoPostParent}
            initial="close"
            animate="open"
            exit="close"
        >
            <motion.img variants={DropmenuInfoPostChild} src={data.photo} alt='photo' />
            <motion.section variants={DropmenuInfoPostChild} className="DropmenuInfoPost_header">
                <motion.h1 variants={DropmenuInfoPostChild}>Name: {data.name}</motion.h1>
                <motion.p variants={DropmenuInfoPostChild}><b>Display Description:</b> {data.display_description}</motion.p>
            </motion.section>
            <motion.p variants={DropmenuInfoPostChild}><b>Text:</b> {data.text}</motion.p>
            <h3>Author: {data.author?.first_name} {data.author?.last_name}</h3>
        </motion.section>
    )
}