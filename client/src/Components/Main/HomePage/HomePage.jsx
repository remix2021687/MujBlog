import { useEffect, useState } from "react"
import { BlogBox } from '../../Layout/BlogBox/BlogBox'
import { GetPost } from "../../../Axios/AxiosInit"
import { PinPost } from './components/PinPost/PinPost'

export const HomePage = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        GetPost()
        .then((res) => {
            setData(res.data)
        })
        .catch((err) => {
            setData(false);
            console.error(err)
        })
    }, [])

    return (
        <section className="HomePage">
            <PinPost />
            {
                data ?
                data.map((data, index) => 
                    <BlogBox 
                        key={index + 1}
                        id={data.id}
                        name={data.name}
                        image={data.photo}
                        display_description={data.display_description}
                    />
                )
                :
                <h1>Posts not Loaded</h1>
            }
        </section>
    )
}