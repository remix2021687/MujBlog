import { motion } from "motion/react"
import { useEffect } from "react"
import { GetPostPinSelf } from "../../../Axios/AxiosInit"
import moment from "moment/moment"
import { useGetPostSelfQuery } from "../../../redux/slices/api/PostsSlice"

export const Modal = ({id, setReturnEvent, pinMode}) => {
    const { data: postData, isError } = useGetPostSelfQuery(id);

    const formateData = moment(postData?.date_created).format("D.MM.YYYY")
    
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
        if (pinMode) {
            GetPostPinSelf(id)
            .then((res) => {
                setData(res.data)
            })
            .catch(() => {
                setData(false)
                setReturnEvent(false);
            })
            
        }

        if (isError) {
            setReturnEvent(false);
        }

    }, [isError])

    return (
        <>
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
                    <motion.img variants={ModalAnimationChildren} src={postData?.photo} />
                    <section className="Modal_left_header">
                        <motion.h1 variants={ModalAnimationChildren}>{postData?.name}</motion.h1>
                        <motion.p variants={ModalAnimationChildren}>{postData?.text}</motion.p>
                    </section>
                </section>
                <section className="Modal_right">
                    <motion.section variants={ModalAnimationChildren} className="Modal_right_presonal">
                        <section>
                            <h1>Auhor by</h1>
                            <h3>{postData?.author.last_name} {postData?.author.first_name}</h3>
                        </section>
                        <motion.button 
                            variants={ModalAnimationChildren} 
                            onClick={ClickHendler}
                            whileHover={{
                                backgroundColor: "#ff0000",
                                borderColor: "#ff0000",
                                color: '#ffffff',
                            }}
                            whileTap={{
                                scale: 0.9
                            }}
                        >
                        Close
                        </motion.button>
                    </motion.section>
                    <motion.h4 variants={ModalAnimationChildren}><span>Created by</span> {formateData}</motion.h4>
                </section>
            </motion.section>

        </>
    )
}