import { motion, AnimatePresence } from 'motion/react';
import { useState } from 'react';
import { PostEditDropmenu } from './components/PostEditDropmenu';
import { ConfirmDelateModal } from './components/ConfirmDelateModal';
import { useSelector, useDispatch } from 'react-redux';
import { openDeleteModel } from '../../../../../../../redux/slices/DeleteModelSlice';


export const PostEdit = ({ id, index, Name, Photo, isPined, DisplayDescription, Text, postChild }) => {
    const dispatch = useDispatch();
    const [isOpen, setIsOpen] = useState(false);
    const DeleteMenuState = useSelector((state) => state.deletemodel.isOpen);

    const CloseHendle = (event) => {
        if (event) {
            setIsOpen(false);
        }
    }

    const onDelete = () => dispatch(openDeleteModel());

    return (
        <>
            <AnimatePresence>
                {
                    DeleteMenuState && <ConfirmDelateModal id={id} name={Name} />
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