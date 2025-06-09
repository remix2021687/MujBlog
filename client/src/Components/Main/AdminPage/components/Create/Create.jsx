import { Image, Plus } from '@phosphor-icons/react'
import { motion } from 'motion/react'
import { useDispatch } from 'react-redux'
import { posts } from '../../../../../redux/slices/CategorySlice'
import { useForm } from 'react-hook-form'
import { useState, useEffect } from 'react'
import { toast } from 'react-toastify'
import { GetProfile } from '../../../../../Axios/AxiosInit'
import { useCreatePostAdminMutation } from '../../../../../redux/slices/api/AdminSlice'


export const Create = () => {
    const RequiredErrorMSG = 'This field is required !'
    const { register, handleSubmit, watch, formState: {errors} } = useForm();
    const [ AdminID, setAdminID ] = useState([]);
    const dispatch = useDispatch();
    const [addPostAdmin, {
        isLoading, 
        isSuccess, 
        isError, 
        error
    }] = useCreatePostAdminMutation();

    const ImageWatch = watch("photo");


    const OnSubmit = async (data) => {
        await addPostAdmin({
            'photo': data.photo[0],
            'name': data.name,
            'display_description': data.display_description,
            'text': data.text,
            'author': AdminID
        })        
    }

    useEffect(() => {
        if (isLoading) {
            toast.loading('Loading...', {
                position: 'top-right',
                closeOnClick: true,
                draggable: true,
                pauseOnHover: false,
                autoClose: 3000,
            })
        } else if (isSuccess) {
            toast.success('Post has been created', {
                position: 'top-right',
                closeOnClick: true,
                draggable: true,
                pauseOnHover: false,
                autoClose: 3000,
            })
            dispatch(posts());
        } else if (isError) {
            toast.error("Post didn't created", {
                position: 'top-right',
                closeOnClick: true,
                draggable: true,
                pauseOnHover: false,
                autoClose: 3000,
            })

            console.log(error);
        }
    }, [isLoading, isLoading, isError])

    const CreateParent = {
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

    const CreateChild = {
        open: {
            opacity: 1,
            y: 0
        },

        close: {
            opacity: 0,
            y: -15
        }
    }

    useEffect(() => {
        GetProfile()
        .then((res) => {
            setAdminID(res.data?.[0].id)            
        })
        .catch((res) => {
            setAdminID([]);
        })
    }, [])

    return (
        <motion.section 
            className="Create"
            variants={CreateParent}
            initial="close"
            animate="open"
            exit="close"
        >
            <motion.h1 variants={CreateChild}>Create Post</motion.h1>
            <form className="Create_form" onSubmit={handleSubmit(OnSubmit)}>
                <motion.label whileHover={{boxShadow: '0px 0px 10px 7px rgba(0,0,0,0.12)'}} variants={CreateChild} htmlFor="setPhoto" className="Create_form_photo_label">
                    <section className={
                        ImageWatch?.[0] ?
                        'Create_form_photo_label_zone choosed'
                        :
                        'Create_form_photo_label_zone'
                    }>
                        <Image size={32} weight='bold' />
                        <h2>{ImageWatch?.[0] ? 'Change Photo': 'Upload Photo'}</h2>
                    </section>
                    {ImageWatch?.[0] ? <img src={URL.createObjectURL(ImageWatch?.[0])} alt='photo' />: null}
                    <input
                        {...register('photo', {
                            required: RequiredErrorMSG
                        })}
                        id="setPhoto" 
                        type="file" 
                        name="photo"
                        accept='image/png, image/jpeg' 
                        hidden 
                    />
                </motion.label>
                
                <span>{errors.photo?.message}</span>

                <motion.section variants={CreateChild} className='Create_form_input_name'>
                    <input 
                        {...register('name', {
                            required: RequiredErrorMSG
                        })}
                        type="text" 
                        name="name" 
                        placeholder="Name*"     
                    />
                    <span>{errors.name?.message}</span>
                </motion.section>
                <motion.section variants={CreateChild}  className='Create_form_input_display_description'>
                    <input 
                        {...register('display_description', {
                            required: RequiredErrorMSG
                        })}
                        type="text" 
                        name="display_description" 
                        placeholder="Display description*" 
                    />
                    <span>{errors.display_description?.message}</span>
                </motion.section>
                <motion.section variants={CreateChild} className='Create_form_input_text'>
                    <textarea 
                        {...register('text', {
                            required: RequiredErrorMSG
                        })}
                        name="text" 
                        placeholder="Text*"
                    ></textarea>
                    <span>{errors.text?.message}</span>
                </motion.section>
                <motion.button 
                    variants={CreateChild} 
                    className='Create_form_button'
                    whileHover={{
                        scale: 1.05,
                        color: '#ffffff',
                        backgroundColor : '#008000',
                        boxShadow: '0px 10px 7px #0000001f'
                    }}
                >
                    <Plus size={28} weight='bold' />
                    Create
                </motion.button>
            </form>
        </motion.section>
    )
}