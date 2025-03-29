import { useState } from "react"
import { PostEdit } from "./components/PostEdit/PostEdit"
import { motion } from "motion/react"
import { useEffect } from "react";
import { GetPostAdmin } from "../../../../../Axios/AxiosInit";

export const Posts = () => {
    const [data, setData] = useState([]);
    
    const PostParent = {
        open: {
            transition: {
                // duraction: 0.5,
                staggerChildren: 0.08,
                delayChildren: 0.1
            }
        },

        close: {
            transition: {
                // duraction: 0.5
                staggerChildren: 0.08,
                delayChildren: 0.1
            }
        }
    }

    const PostChild = {
        open: {
            y: 0,
            opacity: 1
        },

        close: {
            y: -15,
            opacity: 0
        }
    }

    useEffect(() => {
        GetPostAdmin()
        .then((res) => {
            setData(res.data)
        })
        .catch((err) => {
            console.error(err);
            setData([])
        })

    }, [])


    return (
        <motion.section 
            className="Posts"
            variants={PostParent}
            initial="close"
            animate="open"
            exit="close"
        >
            <motion.h1 variants={PostChild}>Posts</motion.h1>
            <section className="Posts_content">
                {
                    data ?
                    data.map((data, index) => 
                        <PostEdit
                            key={index + 1}
                            id={data.id}
                            Name={data.name}
                            Photo={data.photo}
                            DisplayDescription={data.display_description}
                            Text={data.text}
                            postChild={PostChild} 
                        />
                    )
                    :
                    null
                }
            </section>
        </motion.section>
    )
}