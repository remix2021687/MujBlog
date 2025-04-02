import { motion, AnimatePresence } from 'motion/react';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { PostEditDropmenu } from './components/PostEditDropmenu';
import { DeletePostAdmin } from '../../../../../../../Axios/AxiosInit';


export const PostEdit = ({ id, index, Name, Photo, DisplayDescription, Text, postChild }) => {
    const [isOpen, setIsOpen] = useState(false);

    const CloseHendle = (event) => {
        if (event) {
            setIsOpen(false);
        }
    }

    const onDelete = () => {
        DeletePostAdmin(id)
        .then(() => {
            toast.success('Delete Post is successfull !', {
                position: 'top-right',
                closeOnClick: false,
                draggable: true,
                pauseOnHover: false,
                autoClose: 3000,
            })
        })

        .catch(() => {
            toast.error("Delete Post isn't successfull !", {
                position: 'top-right',
                closeOnClick: false,
                draggable: true,
                pauseOnHover: false,
                autoClose: 3000,
            })
        })
    }

    return (
        <motion.section 
            className="PostEdit"
            variants={postChild}
            custom={index}
        >
            <section className='PostEdit_header'>
                <section className='PostEdit_header_photo_name'>
                    <img src={Photo} alt='photo' />
                    <h2>{Name}</h2>
                </section>
                <section className='PostEdit_header_control'>
                    <button className='edit' onClick={() => setIsOpen(true)}>Edit</button>
                    <button className='delete' onClick={onDelete} >Delete</button>
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