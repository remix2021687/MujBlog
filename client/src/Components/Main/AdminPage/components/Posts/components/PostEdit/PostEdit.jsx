import { motion, AnimatePresence } from 'motion/react';
import examplePhoto from '../../../../../../../assets/img/examplePhoto.jpg';
import { useState } from 'react';
import { PostEditDropmenu } from './components/PostEditDropmenu';

export const PostEdit = ({ id, postChild }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <motion.section 
            className="PostEdit"
            variants={postChild}
        >
            <section className='PostEdit_header'>
                <section className='PostEdit_header_photo_name'>
                    <img src={examplePhoto} alt='photo' />
                    <h2>Test</h2>
                </section>
                <section className='PostEdit_header_control'>
                    <button className='edit' onClick={() => setIsOpen(true)}>Edit</button>
                    <button className='delete'>Delete</button>
                </section>
            </section>
            <AnimatePresence>
                {
                    isOpen && <PostEditDropmenu />
                }
            </AnimatePresence>
        </motion.section>
    )
}