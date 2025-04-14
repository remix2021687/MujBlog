import { motion } from "motion/react"
import { useForm, Controller } from "react-hook-form"
import { toast } from "react-toastify";
import { FileArrowUp } from '@phosphor-icons/react'
import { EditPostAdmin } from "../../../../../../../../Axios/AxiosInit"
import { Checkbox } from "antd";

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


    const ImgaeWatch = watch('photo');

    const ImgaePreview = ImgaeWatch !== undefined ? ImgaeWatch.length > 0 ? URL.createObjectURL(ImgaeWatch[0]): null: Photo

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

    const OnSubmit = (data) => {
        EditPostAdmin(Id, {
            ...(data.photo && data.photo.length > 0 && {"photo": data.photo}),
            "name": data.name,
            "display_description": data.display_description,
            "text": data.text,
            "pin_post": data.pin_post
        })
        .then(() => {
            toast.success('Update successfull !', {
                position: 'top-right',
                closeOnClick: false,
                draggable: true,
                pauseOnHover: false,
                autoClose: 3000,
            })

            setCloseEdit(true)
        })
        .catch(() => {
            toast.error('Problem to update !', {
                position: 'top-right',
                closeOnClick: false,
                draggable: true,
                pauseOnHover: false,
                autoClose: 3000,
            })
        })
    }

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
                    <img src={ImgaePreview}  alt={Name} />
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
                <section className="PostEdit_edit_dropmenu_change_check">
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
                </section>
                <section className='PostEdit_edit_dropmenu_change_submit_cancel'>
                    <motion.button variants={PostEditChild} className='save'>Save</motion.button>
                    <motion.button
                        type='button'
                        variants={PostEditChild} 
                        className='cancel'
                        onClick={() => {setCloseEdit(true)}}
                    >
                        Cancel
                    </motion.button>
                </section>
            </motion.form>
        </>
    )
}