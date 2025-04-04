import { motion } from "motion/react"
import { useEffect, useState } from "react"
import { DropmenuInfoPost } from "./components/DropmenuInfoPost";
import { GetPostAdmin } from "../../../../../../../Axios/AxiosInit";

export const PostBlock = ({id, index, name, photo, dateCreated, childAnimation }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [data, setData] = useState();

    useEffect(() => {
        GetPostAdmin(id)
        .then((res) => {
            if (res) {
                console.log(res)
            }
            // setData(res.data[0]);
        })
        // .catch(() => {
        //     setData()
        // })
    }, [])
    
    return (
        <>
            <motion.section 
                className="PostBlock"
                whileHover={{
                    boxShadow: '8px 7px 9px 11px rgba(0,0,0,0.11)'
                }}
                custom={index}
                variants={childAnimation}
            >
                <section className="PostBlock_info">
                    <img src={photo} alt={name} />
                    <h2>{name}</h2>
                </section>

                <h2>{dateCreated}</h2>

            </motion.section>
            
            <DropmenuInfoPost 
                name={data?.name}
                photo={data?.photo}
                DisplayDescription={data?.display_description}
                text={data?.text}
            />
        </>
    )
}