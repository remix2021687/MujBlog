import { motion } from "motion/react"
import { FileArrowUp } from '@phosphor-icons/react'

import examplePhoto from '../../../../../../../../assets/img/examplePhoto.jpg';

export const PostEditDropmenu = () => {

    const PostEditParent = {
        open: {
            opacity: 1,

            transition: {
                duraction: 0.5,
                staggerChildren: 0.08,
                delayChildren: 0.1
            }
        },

        close: {
            opacity: 0,

            transition: {
                duraction: 0.5,
                staggerChildren: 0.08,
                delayChildren: 0.1
            }
        }
    }

    const PostEditChild = {
        open: {
            y: 0,
            opacity: 1
        },

        close: {
            y: -10,
            opacity: 0
        }
    }

    return (
        <>
            <motion.form 
                className='PostEdit_edit_dropmenu'
                variants={PostEditParent}
                initial="close"
                animate="open"
                exit="close"
            >
                <motion.label variants={PostEditChild} htmlFor='NewPhoto' className='PostEdit_edit_dropmenu_change_photo'>
                    <img src={examplePhoto} alt='example' />
                    <section className='NewPhoto_change'>
                        <FileArrowUp size={32} />
                        <h2>Click to Change</h2>
                    </section>
                    <input id='NewPhoto' type='file' accept='image/png, image/jpeg' hidden />
                </motion.label>
                <section className='PostEdit_edit_dropmenu_change_name'>
                    <motion.input variants={PostEditChild} type='text' name='Name' placeholder='Name*' />
                    <span></span>
                </section>
                <section className='PostEdit_edit_dropmenu_change_display_description'>
                    <motion.input variants={PostEditChild} type='text' name='Display description' placeholder='Display description*' />
                    <span></span>
                </section>
                <section className='PostEdit_edit_dropmenu_change_text'>
                    <motion.textarea variants={PostEditChild} type='text' name='Text' placeholder='Text*' />
                    <span></span>
                </section>
                <section className='PostEdit_edit_dropmenu_change_submit_cancel'>
                    <motion.button variants={PostEditChild} className='save'>Save</motion.button>
                    <motion.button variants={PostEditChild} className='cancel'>Cancel</motion.button>
                </section>
            </motion.form>
        </>
    )
}