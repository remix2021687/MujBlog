import { useState, useEffect } from "react";
import { motion } from "motion/react"
import { User, Note } from "@phosphor-icons/react"
import { InfoBlocks } from "./components/InfoBlocks"
import { PostBlock } from "./components/PostBlock/PostBlock"
import { GetAdminList, GetPostAdmin } from "../../../../../Axios/AxiosInit";
import moment from "moment";


export const Dashboard = () => {
    const [dataPosts, setDataPosts] = useState([]);
    const [dataCountAdmins, setDataCountAdmins] = useState(0);

    useEffect(() => {
        GetPostAdmin()
        .then((res) => {
            setDataPosts(res.data)
        })
        .catch((err) => {
            setDataPosts([])
            console.error(err);
        })
    }, [])

    useEffect(() => {
        GetAdminList()
        .then((res) => {
            const countAdmin = res.data.length;

            setDataCountAdmins(countAdmin);
        })

        .catch((err) => {
            setDataCountAdmins(0);
            console.error(err);
        })
    }, []);

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
                        count={dataCountAdmins}
                        icon={<User size={40} />}
                        BgColorIcon={"#8280FF"}
                        colorIcon={'white'}
                        childAnimation={DashboardChild}
                    />

                    <InfoBlocks 
                        name={"Posts"}
                        count={dataPosts.length}
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
                        dataPosts ?
                        dataPosts.map((data, index) => 
                            <PostBlock
                                key={index + 1}
                                index={index + 1}
                                id={data.id}
                                name={data.name}
                                photo={data.photo}
                                isPined={data.pin_post}
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