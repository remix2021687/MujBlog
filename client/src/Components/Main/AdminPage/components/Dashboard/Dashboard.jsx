import { useState, useEffect } from "react";
import { motion } from "motion/react"
import { useNavigate } from "react-router";
import { User, Note } from "@phosphor-icons/react"
import { InfoBlocks } from "./components/InfoBlocks"
import { PostBlock } from "./components/PostBlock"
import { GetPostAdmin, refTokenAuth } from "../../../../../Axios/AxiosInit";
import moment from "moment";


export const Dashboard = () => {
    const navigate = useNavigate();
    const [data, setData] = useState([]);

    useEffect(() => {
        GetPostAdmin()
        .then((res) => {
            setData(res.data)
        })
        .catch((err) => {
            navigate('/admin/login')
            console.error(err);

            refTokenAuth({
                'refresh': localStorage.getItem('token_ref')
            })
            .then((res) => {
                localStorage.setItem('token', res.data.access)
            })
            .catch(() => {
                localStorage.removeItem('token')
                localStorage.removeItem('token_ref');
            })
        })
    }, [])

    const DashboardParent = {
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
        }
    }

    const DashboardChild = {
        open: {
            opacity: 1,
            y: 0,
        },

        close: {
            opacity: 0,
            y: -15,
        }
    }

    const DashboardChildPosts = {
        open: (index) => ({
            opacity: 1,
            x: 0,

            transition: {
                delay: index * 0.1
            }
        }),

        close: {
            opacity: 0,
            x: -15,
        }
    }

    return (
        <motion.section 
            className="Dashboard"
            variants={DashboardParent}
            initial="close"
            animate="open"
            exit="close"
        >
            <h1>Dashboard</h1>

            <section className="Dashboard_content">
                <section className="Dashboard_content_header">
                    <InfoBlocks 
                        name={"User"}
                        count={"2"}
                        icon={<User size={40} />}
                        BgColorIcon={"#8280FF"}
                        colorIcon={'white'}
                        childAnimation={DashboardChild}
                    />

                    <InfoBlocks 
                        name={"Posts"}
                        count={data.length}
                        icon={<Note size={40} />}
                        BgColorIcon={"#FEC53D"}
                        colorIcon={'white'}
                        childAnimation={DashboardChild}
                    />    
                </section>

                <h1>Post List</h1>

                <motion.section 
                    className="Dashboard_content_posts"
                    variants={DashboardParent}
                    initial="close"
                    animate="open"
                    exit="close"
                >
                    {
                        data ?
                        data.map((data, index) => 
                            <PostBlock
                                key={index + 1}
                                index={index + 1}
                                id={data.id}
                                name={data.name}
                                photo={data.photo}
                                dateCreated={moment(data.date_created).format("D.MM.YYYY")}
                                childAnimation={DashboardChildPosts}
                            />
                        )
                        :
                        null
                    }
                </motion.section>
            </section>
        </motion.section>
    )
}