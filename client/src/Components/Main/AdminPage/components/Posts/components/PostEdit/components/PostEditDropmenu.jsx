import { useEffect } from "react";
import { useForm, Controller } from "react-hook-form"
import { toast } from "react-toastify";
import { motion } from "motion/react"
import { FileArrowUp } from '@phosphor-icons/react'
import { Checkbox } from "antd";
import { useEditPostAdminMutation } from "../../../../../../../../redux/slices/api/AdminSlice";

export const PostEditDropmenu = ({ Id, Photo, Name, DisplayDescription, Text, isPined, setCloseEdit}) => {
    const RequiredErrorMSG = 'This field is required !'
    const {register, handleSubmit, control, watch, formState: {errors}} = useForm({
        defaultValues: {
            "name": Name,
            'display_description': DisplayDescription,
            "text": Text,
            "pin_post": isPined
        }
    });

    const [EditPostAdmin, {
        isLoading,
        isSuccess, 
        isError, 
    }] = useEditPostAdminMutation();


    const ImgaeWatch = watch('photo');

    const ImgaePreview = ImgaeWatch !== undefined ? ImgaeWatch.length > 0 ? URL.createObjectURL(ImgaeWatch[0]): null: Photo;

    const PostEditParent = {
        open: {
            opacity: 1,
            y: 0,

            transition: {
                duraction: 0.5,
                staggerChildren: 0.08,
                delayChildren: 0.1
            }
        },

        close: {
            opacity: 0,
            y: -15,

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

    const OnSubmit = (data) => EditPostAdmin(Object.assign(data, {id: Id}))

    useEffect(() => {
        if (isLoading) {
            toast.loading('Loading...', {
                position: 'top-right',
                closeOnClick: true,
                draggable: true,
                pauseOnHover: false,
                autoClose: 3000,
            })
        } 
        else if (isSuccess) {
            toast.success('Update successfull !', {
                position: 'top-right',
                closeOnClick: false,
                draggable: true,
                pauseOnHover: false,
                autoClose: 3000,
            })
        } 
        else if (isError) {
            toast.error("Post didn't update !", {
                position: 'top-right',
                closeOnClick: false,
                draggable: true,
                autoClose: 3000,
            })
        }

    }, [isLoading, isSuccess, isError])

    return (
        <>
            <motion.form 
                className='PostEdit_edit_dropmenu'
                variants={PostEditParent}
                initial="close"
                animate="open"
                exit="close"
                onSubmit={handleSubmit(OnSubmit)}
            >
                <motion.label variants={PostEditChild} htmlFor='NewPhoto' className='PostEdit_edit_dropmenu_change_photo'>
                    <img src={ImgaePreview == null ? Photo: ImgaePreview}  alt={Name} />
                    <section className='NewPhoto_change'>
                        <FileArrowUp size={32} />
                        <h2>Click to Change</h2>
                    </section>
                    <input
                        {...register('photo')} 
                        id='NewPhoto' 
                        type='file'
                        name="photo"
                        accept='image/png, image/jpeg'
                        hidden 
                    />
                </motion.label>
                <span>{errors.photo?.message}</span>
                <section className='PostEdit_edit_dropmenu_change_name'>
                    <motion.input
                        {...register("name", {
                            required: {
                                value: true,
                                message: RequiredErrorMSG
                            }
                        })} 
                        variants={PostEditChild} 
                        type='text' 
                        name='name' 
                        placeholder='Name*'
                    />
                    <span>{errors.name?.message}</span>
                </section>
                <section className='PostEdit_edit_dropmenu_change_display_description'>
                    <motion.input
                        {...register("display_description", {
                            required: {
                                value: true,
                                message: RequiredErrorMSG
                            }
                        })} 
                        variants={PostEditChild} 
                        type='text' 
                        name='display_description' 
                        placeholder='Display description*' 
                    />
                    <span>{errors.display_description?.message}</span>
                </section>
                <section className='PostEdit_edit_dropmenu_change_text'>
                    <motion.textarea
                        {...register("text", {
                            required: {
                                value: true,
                                message: RequiredErrorMSG
                            }
                        })}
                        variants={PostEditChild} 
                        name='text' 
                        placeholder='Text*' 
                    />
                    <span>{errors.text?.message}</span>
                </section>
                <motion.section
                    variants={PostEditChild} 
                    className="PostEdit_edit_dropmenu_change_check"
                >
                        <Controller 
                            name="pin_post"
                            control={control}
                            rules={{
                                required: false
                            }}
                            render={({ field }) => 
                                <Checkbox 
                                    checked={field.value}
                                    onChange={(e) => field.onChange(e.target.checked)} 
                                    {...field} 
                                    /> 
                            }
                        />
                        <h4>Pin post</h4>
                </motion.section>
                <section className='PostEdit_edit_dropmenu_change_submit_cancel'>
                    <motion.button 
                        variants={PostEditChild} 
                        whileHover={{
                            color: '#ffffff',
                            backgroundColor: '#008000'
                        }}
                        whileTap={{scale: 0.9}}
                    >
                        Save
                    </motion.button>
                    <motion.button
                        type='button'
                        variants={PostEditChild} 
                        whileHover={{
                            color: '#ffffff',
                            backgroundColor: '#ff0000'
                        }}
                        whileTap={{scale: 0.9}}
                        onClick={() => {setCloseEdit(true)}}
                    >
                        Cancel
                    </motion.button>
                </section>
            </motion.form>
        </>
    )
}