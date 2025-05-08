import { motion, AnimatePresence } from 'motion/react';
import { useState } from 'react';
import { PostEditDropmenu } from './components/PostEditDropmenu';
import { ConfirmDelateModal } from './components/ConfirmDelateModal';


export const PostEdit = ({ id, index, Name, Photo, isPined, DisplayDescription, Text, postChild }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [isOnDelete, setIsOnDelete] = useState(false);

    const CloseHendle = (event) => {
        if (event) {
            setIsOpen(false);
        }
    }

    const CancelHendle = (event) => {
        if (event) {
            setIsOnDelete(false);
        }
    }

    const onDelete = () => setIsOnDelete(true);

    return (
        <>
            <AnimatePresence>
                {
                    isOnDelete && <ConfirmDelateModal id={id} name={Name}  cancelState={CancelHendle}/>
                }
            </AnimatePresence>
            <motion.section 
                className="PostEdit"
                variants={postChild}
                custom={index}
            >
                <section className='PostEdit_header'>
                    <section className='PostEdit_header_photo_name'>
                        <img src={Photo} alt='photo' />
                        <section className='PostEdit_header_photo_name_pin'>
                            <h2>{Name}</h2>
                            {isPined ? <span>pined</span>: null}
                        </section>
                    </section>
                    <section className='PostEdit_header_control'>
                        <motion.button 
                            className='edit' 
                            onClick={() => setIsOpen(true)}
                            whileHover={{
                                color: '#ffffff',
                                backgroundColor: '#ffa500',
                            }}
                            whileTap={{scale: 0.9}}
                        >
                            Edit
                        </motion.button>
                        <motion.button 
                            className='delete' 
                            onClick={onDelete}
                            whileHover={{
                                color: '#ffffff',
                                backgroundColor: '#ff0000',
                            }}
                            whileTap={{scale: 0.9}}
                        >
                            Delete
                        </motion.button>
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
                            isPined={isPined}
                            setCloseEdit={CloseHendle}
                        />
                    }
                </AnimatePresence>
            </motion.section>
        </>
    )
}