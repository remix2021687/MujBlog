import { motion } from "motion/react"
import { User, Note } from "@phosphor-icons/react"
import { LoadingOutlined } from '@ant-design/icons'
import { Spin } from "antd";
import { InfoBlocks } from "./components/InfoBlocks"
import { PostBlock } from "./components/PostBlock/PostBlock"
import moment from "moment";

import { useGetPostsQuery, useGetAdminListQuery } from "../../../../../redux/slices/api/AdminSlice";


export const Dashboard = () => {
    const { data: posts, isLoading, Errors } = useGetPostsQuery();
    const { data: adminCount } = useGetAdminListQuery()

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
    
    if (isLoading) {
        return (
            <Spin
                size="large" 
                indicator={<LoadingOutlined />}
            />
        )
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
                        count={adminCount?.length}
                        icon={<User size={40} />}
                        BgColorIcon={"#8280FF"}
                        colorIcon={'white'}
                        childAnimation={DashboardChild}
                    />

                    <InfoBlocks 
                        name={"Posts"}
                        count={posts?.length}
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
                        posts?.map((data, index) => 
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
                    }
                </motion.section>
            </section>
        </motion.section>
    )
}