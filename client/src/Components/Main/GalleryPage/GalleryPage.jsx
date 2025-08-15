import { GalleryPhoto } from "./components/GalleryPhoto/GalleryPhoto";
import { useGetGalleryQuery } from "../../../redux/slices/api/PostsSlice";

export const GalleryPage = () => {
	const { data: galleryData, isLoading } = useGetGalleryQuery();

	return (
		<section className='GalleryPage'>
			{galleryData?.map((data) => (
				<GalleryPhoto
					key={data.id}
					id={data.id}
					name={data.name}
					photo={data.photo}
				/>
			))}
		</section>
	);
};
