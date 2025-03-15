import { useEffect } from "react";
import { useState } from "react"
import { GetGallery } from "../../Axios/AxiosInit";
import { GalleryPhoto } from "./components/GalleryPhoto";

export const GalleryPage = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        GetGallery()
        .then((res) => {
            setData(res.data)
            console.log(res.data)
        })
        .catch((err) => {
            console.error(err);
        })
    }, [])
    
    return (
        <section className="GalleryPage">
            {
                data.map((data) => 
                    <GalleryPhoto
                        key={data.id}
                        id={data.id}
                        name={data.name}
                        photo={data.photo}
                    />
                )
            }
        </section>
    )
}