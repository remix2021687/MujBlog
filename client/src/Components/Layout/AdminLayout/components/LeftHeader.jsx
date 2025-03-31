import { motion } from 'motion/react'
import { toast } from "react-toastify";
import { useNavigate } from 'react-router';
import { useState, useEffect } from 'react'
import { Gauge, Note, User, Plus } from '@phosphor-icons/react'

import { GetProfile } from '../../../../Axios/AxiosInit'
import Logo from '../../../../assets/img/kludieLogo.png'

export const LeftHeader = ({ setCatergoryState }) => {
    const [selectButton, setSelectButton] = useState('Dashboard');
    const [data, setData] = useState([]);
    const navigate = useNavigate()
    
    const ButtonInfo = [
        {
            value: "Dashboard",
            name: 'Dashboard',
            icon: <Gauge size={22} />
        },
        {
            value: "Posts",
            name: "Posts",
            icon: <Note size={22} />
        },
        {
            value: "Create",
            name: "Create",
            icon: <Plus size={22} />
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

    useEffect(() => {
        setCatergoryState(selectButton)
    })

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
                            <>
                                <motion.button
                                    key={index + 1}
                                    className={
                                        selectButton == data.name ?
                                        "LeftHeader_catergory_button activ"
                                        :
                                        'LeftHeader_catergory_button'
                                    }
                                    name={data.name}
                                    onClick={() => {
                                        setSelectButton(data.name)
                                    }}
                                >
                                    {selectButton === data.name && (
                                        <motion.section 
                                            layoutId='selected'
                                            className='LeftHeader_catergory_button_bg'
                                        ></motion.section>
                                    )}
                                    <span>
                                        {data.icon}
                                        {data.value}
                                    </span>
                                </motion.button>
                            </>
                        )
                    }
                </section>
                <section>
                    <hr />
                    <section className='LeftHeader_details'>
                        <motion.section 
                            className='LeftHeader_details_profile'
                            whileHover={{
                                scale: 1.05,
                                boxShadow: '0px 0px 10px 7px rgba(0,0,0,0.12)'
                            }}
                        >
                            <span><User size={32}/></span>
                            <section className='LeftHeader_details_profile_info'>
                                <h4>{data[0]?.last_name} {data[0]?.first_name}</h4>
                                <h5>Admin</h5>
                            </section>
                        </motion.section>
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