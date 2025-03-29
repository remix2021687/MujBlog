import { motion, AnimatePresence } from 'motion/react';
import { useState } from 'react';
import { PostEditDropmenu } from './components/PostEditDropmenu';


export const PostEdit = ({ id, Name, Photo, DisplayDescription, Text, postChild }) => {
    const [isOpen, setIsOpen] = useState(false);

    const CloseHendle = (event) => {
        if (event) {
            setIsOpen(false);
        }
    }

    return (
        <motion.section 
            className="PostEdit"
            variants={postChild}
        >
            <section className='PostEdit_header'>
                <section className='PostEdit_header_photo_name'>
                    <img src={Photo} alt='photo' />
                    <h2>{Name}</h2>
                </section>
                <section className='PostEdit_header_control'>
                    <button className='edit' onClick={() => setIsOpen(true)}>Edit</button>
                    <button className='delete'>Delete</button>
                </section>
            </section>
            <AnimatePresence>
                {
                    isOpen && <PostEditDropmenu 
                        Id={id}
                        Name={Name}
                        Photo={Photo}
                        DisplayDescription={DisplayDescription}
                        Text={Text}
                        setCloseEdit={CloseHendle}
                    />
                }
            </AnimatePresence>
        </motion.section>
    )
}