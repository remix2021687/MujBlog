import { GetPostPin } from "../../../../../Axios/AxiosInit";
import { BlogBox } from "../../../../Layout/BlogBox/BlogBox"
import { useState, useEffect } from "react"

export const PinPost = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        GetPostPin()
        .then((res) => {
            setData(res.data)
        })
        .catch(() => {
            setData([]);
        })
    }, [])

    return (
        <>
            {
                data ?
                <section className="PinPost">
                    <h1>Favorite Posts</h1>
                    <section className="PinPost_content">
                        {
                            data.map((data, index) => 
                                <BlogBox
                                    key={index + 1}
                                    id={data.id}
                                    name={data.name}
                                    image={data.photo}
                                    display_description={data.display_description}
                                    pinMode={true}
                                />
                            )
                        }
                    </section>
                </section>
                :
                null
            }
        </>
    )
}