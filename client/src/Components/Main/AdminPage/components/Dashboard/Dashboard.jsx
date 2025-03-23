import { useState, useEffect } from "react";
import { motion } from "motion/react"
import { useNavigate } from "react-router";
import { User, Note } from "@phosphor-icons/react"
import { InfoBlocks } from "./components/InfoBlocks"
import { PostBlock } from "./components/PostBlock"
import { AxiosInit, GetPostAdmin, refTokenAuth } from "../../../../../Axios/AxiosInit";
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

    return (
        <motion.section 
            className="Dashboard"
            initial={{
                y: -15,
                opacity: 0
            }}
            animate={{
                y: 0,
                opacity: 1
            }}
            exit={{
                y: 15,
                opacity: 0
            }}
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
                    />

                    <InfoBlocks 
                        name={"Posts"}
                        count={data.length}
                        icon={<Note size={40} />}
                        BgColorIcon={"#FEC53D"}
                        colorIcon={'white'}
                    />    
                </section>

                <h1>Post List</h1>

                <section className="Dashboard_content_posts">
                    {
                        data ?
                        data.map((data) => 
                            <PostBlock
                                id={data.id}
                                name={data.name}
                                photo={data.photo}
                                dateCreated={moment(data.date_created).format("D.MM.YYYY")}
                            />
                        )
                        :
                        null
                    }
                </section>
            </section>
        </motion.section>
    )
}