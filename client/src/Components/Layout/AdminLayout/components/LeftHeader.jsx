import { color, motion } from 'motion/react'
import { toast } from "react-toastify";
import { useNavigate } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { dashboard, posts, create } from '../../../../redux/slices/CategorySlice';
import { useState, useEffect } from 'react'
import { Gauge, Note, User, Plus } from '@phosphor-icons/react'

import { GetProfile } from '../../../../Axios/AxiosInit'
import Logo from '../../../../assets/img/kludieLogo.png'

export const LeftHeader = () => {
    const CatergoryValue = useSelector(state => state.category.value)
    const [data, setData] = useState([]);
    const navigate = useNavigate()
    const dispatch = useDispatch();
    
    const ButtonInfo = [
        {
            value: "Dashboard",
            name: 'Dashboard',
            icon: <Gauge size={22} />,
            onclick: () => dispatch(dashboard())
        },
        {
            value: "Posts",
            name: "Posts",
            icon: <Note size={22} />,
            onclick: () => dispatch(posts())
        },
        {
            value: "Create",
            name: "Create",
            icon: <Plus size={22} />,
            onclick: () => dispatch(create())
        },
    ]

    useEffect(() => {
        GetProfile()
        .then((res) => {
            setData(res.data)
        })

        .catch((err) => {
            setData([]);
            console.error(err);
        })
    }, [])

    const Logout = () => {
        navigate('/')
        localStorage.removeItem('token')
        localStorage.removeItem('token_ref')

        toast.success('Logout successfull !', {
            position: 'top-center',
            closeOnClick: false,
            draggable: true,
            pauseOnHover: false,
            autoClose: 3000,
        })
    }

    return (
        <section className="LeftHeader">
            <img src={Logo} alt='Logo' />
            <section className='LeftHeader_content'>
                <section className='LeftHeader_catergory'>
                    {
                        ButtonInfo.map((data, index) => 
                            <motion.button
                                key={index + 1}

                                animate={
                                    CatergoryValue == data.value ?
                                    {color: '#ffffff'}
                                    :
                                    {color: '#000000'}
                                }

                                name={data.name}
                                onClick={data.onclick}
                            >
                                {CatergoryValue === data.name && (
                                    <motion.section 
                                        layoutId='selected'
                                        className='LeftHeader_catergory_button_bg'
                                        transition={{
                                            type: 'spring',
                                            bounce: 0.25
                                        }}
                                    ></motion.section>
                                )}
                                <span>
                                    {data.icon}
                                    {data.value}
                                </span>
                            </motion.button>
                        )
                    }
                </section>
                <section>
                    <hr />
                    <section className='LeftHeader_details'>
                        <section className='LeftHeader_details_profile'>
                            <span><User size={32}/></span>
                            <section className='LeftHeader_details_profile_info'>
                                <h4>{data[0]?.last_name} {data[0]?.first_name}</h4>
                                <h5>Admin</h5>
                            </section>
                        </section>
                        <motion.button 
                            className='LeftHeader_details_exit'
                            whileHover={{
                                scale: 1.05,
                            }}

                            onClick={Logout}
                        >
                            Logout
                        </motion.button>
                    </section>
                </section>
            </section>
        </section>
    )
}