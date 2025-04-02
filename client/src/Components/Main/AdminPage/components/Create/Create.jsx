import { Image, Plus } from '@phosphor-icons/react'
import { useForm } from 'react-hook-form'
import { useState, useEffect } from 'react'
import { toast } from 'react-toastify'
import { CreatePostAdmin, GetProfile } from '../../../../../Axios/AxiosInit'


export const Create = () => {
    const RequiredErrorMSG = 'This field is required !'
    const { register, handleSubmit, watch, formState: {errors} } = useForm();
    const [AdminID, setAdminID] = useState([]);

    const ImageWatch = watch("photo");


    const OnSubmit = (data) => {
        CreatePostAdmin({
            'photo': data.photo[0],
            'name': data.name,
            'display_description': data.display_description,
            'text': data.text,
            'author': AdminID
        })

        .then(() => {
            toast.success('Post has been created', {
                position: 'top-right',
                closeOnClick: false,
                draggable: true,
                pauseOnHover: false,
                autoClose: 3000,
            })
        })

        .catch(() => {
            toast.error('Post hasnt created', {
                position: 'top-right',
                closeOnClick: false,
                draggable: true,
                pauseOnHover: false,
                autoClose: 3000,
            })
        })
        
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
        <section className="Create">
            <h1>Create Post</h1>
            <form className="Create_form" onSubmit={handleSubmit(OnSubmit)}>
                <label htmlFor="setPhoto" className="Create_form_photo_label">
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
                </label>
                
                <span>{errors.photo?.message}</span>

                <section className='Create_form_input_name'>
                    <input 
                        {...register('name', {
                            required: RequiredErrorMSG
                        })}
                        type="text" 
                        name="name" 
                        placeholder="Name*"     
                    />
                    <span>{errors.name?.message}</span>
                </section>
                <section className='Create_form_input_display_description'>
                    <input 
                        {...register('display_description', {
                            required: RequiredErrorMSG
                        })}
                        type="text" 
                        name="display_description" 
                        placeholder="Display description*" 
                    />
                    <span>{errors.display_description?.message}</span>
                </section>
                <section className='Create_form_input_text'>
                    <textarea 
                        {...register('text', {
                            required: RequiredErrorMSG
                        })}
                        name="text" 
                        placeholder="Text*"
                    ></textarea>
                    <span>{errors.text?.message}</span>
                </section>
                <button className='Create_form_button'>
                    <Plus size={28} weight='bold' />
                    Create
                </button>
            </form>
        </section>
    )
}