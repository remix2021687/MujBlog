import { Gauge, Note } from '@phosphor-icons/react'
import { motion, AnimatePresence} from 'motion/react'
import { useState } from 'react'
import Logo from '../../../../assets/img/kludieLogo.png'

export const LeftHeader = () => {
    const [selectButton, setSelectButton] = useState('Dashboard');

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
        }
    ]

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
                                    onClick={() => setSelectButton(data.name)}
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
                        <motion.button 
                            className='LeftHeader_details_exit'
                            whileHover={{
                                scale: 1.05,
                            }}
                        >
                            Logout
                        </motion.button>
                    </section>
                </section>
            </section>
        </section>
    )
}