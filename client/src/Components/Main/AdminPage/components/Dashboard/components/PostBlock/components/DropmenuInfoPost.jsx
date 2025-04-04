import examplePhoto from "../../../../../../../../assets/img/examplePhoto.jpg"
import { useEffect, useState } from "react"
import { motion } from "motion/react"
import { GetPostAdmin } from "../../../../../../../../Axios/AxiosInit"


export const DropmenuInfoPost = ({ id }) => {
    const [data, setData] = useState([]);

    useEffect(() => {
            GetPostAdmin(id)
            .then((res) => {
                if (res) {
                    setData(res.data?.[0]);
                }
            })
            .catch(() => {
                setData()
            })
        }, [])

    return (
        <motion.section 
            className="DropmenuInfoPost"
            
        >
            <img src={data.photo} alt='photo' />
            <section className="DropmenuInfoPost_header">
                <h1>{data.name}</h1>
                <p>{data.display_description}</p>
            </section>
            <p>{data.text}</p>
        </motion.section>
    )
}