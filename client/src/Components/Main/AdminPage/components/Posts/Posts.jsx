import { PostEdit } from "./components/PostEdit/PostEdit"
import { motion } from "motion/react"

export const Posts = () => {
    const PostParent = {
        open: {
            transition: {
                duraction: 0.5,
                staggerChildren: 0.08,
                delayChildren: 0.1
            }
        },

        close: {
            transition: {
                duraction: 0.5,
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
                <PostEdit postChild={PostChild} />
                <PostEdit postChild={PostChild} />
                <PostEdit postChild={PostChild} />
                <PostEdit postChild={PostChild} />
                <PostEdit postChild={PostChild} />
                <PostEdit postChild={PostChild} />
            </section>
        </motion.section>
    )
}