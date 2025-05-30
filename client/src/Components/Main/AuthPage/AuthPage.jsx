import { motion } from 'motion/react'
import { useForm } from 'react-hook-form'
import { AuthLogin } from '../../../Axios/AxiosInit'
import { useNavigate } from 'react-router'
import { useEffect } from 'react'
import { toast, Slide } from 'react-toastify'

import Logo from '../../../assets/img/kludieLogo.png'



export const AuthPage = () => {
    const RequiredErrorMSG = 'This field is required !'
    const navigate = useNavigate();
    const {register, handleSubmit, formState: {errors}} = useForm();

    const onSubmit = async (event) => {
        await AuthLogin({
            "username": event.username,
            "password": event.password
        })
        .then((res) => {
            localStorage.setItem('token', res.data.access)
            localStorage.setItem('token_ref', res.data.refresh)
            navigate('/admin');
        })
        .catch(() => {
            toast.error(
            <div>
                <h2>Account not found</h2>
                <p style={{fontSize: 14}}>Please check your username or password</p>
            </div>, {
                position: 'top-center',
                autoClose: 3000,
                pauseOnHover: false,
                transition: Slide,
                closeButton: false,
                style: {
                    textAlign: 'center',
                    whiteSpace: 'pre-line'
                }
            })
        })
    }

    useEffect(() => {
        let token = localStorage.getItem('token')
        if (token) {
            navigate('/admin')
        }
    })

    return (
        <section className="AuthPage">
            <img src={Logo} alt='Logo'/>
            <form className='AuthPage_form' onSubmit={handleSubmit(onSubmit)}>
                <section className='AuthPage_form_username_password'>
                    <section>
                        <input 
                            {...register('username', {
                                required: {
                                    value: true,
                                    message: RequiredErrorMSG,
                                },
                                minLength: {
                                    value: 2,
                                    message: 'Username is so small !'
                                }
                            })}
                            type='text' 
                            name='username' 
                            placeholder='Username*'     
                        />
                        <span>{errors.username?.message}</span>
                    </section>
                    <section>
                        <input 
                            {...register('password', {
                                required: {
                                    value: true,
                                    message: RequiredErrorMSG
                                },
                                minLength: {
                                    value: 5,
                                    minLength: 'Password is so small !'
                                }
                            })}
                            type='password' 
                            name='password' 
                            placeholder='Password*' 
                        />
                        <span>{errors.password?.message}</span>
                    </section>
                </section>
                <motion.button
                    initial={{scale: 1}}
                    whileHover={{scale: 1.2}}
                    whileTap={{scale: 0.8}}
                    transition={{
                        type: 'tween',
                        ease: 'backOut',
                        duration: 0.5
                    }}
                >
                    <span>Login</span>
                </motion.button>
            </form>
        </section>
    )
}