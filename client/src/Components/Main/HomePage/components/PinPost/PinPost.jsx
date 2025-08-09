import { BlogBox } from "../../../../Layout/BlogBox/BlogBox";
import { useGetPostPinQuery } from "../../../../../redux/slices/api/PostsSlice";

export const PinPost = () => {
	const { data: pinData, isLoading } = useGetPostPinQuery();

	return (
		<>
			{pinData?.length > 0 ? (
				<section className='PinPost'>
					<h1>Favorite Posts</h1>
					<section className='PinPost_content'>
						{pinData?.map((data, index) => (
							<BlogBox
								key={index + 1}
								id={data.id}
								name={data.name}
								image={data.photo}
								display_description={data.display_description}
								pinMode={true}
							/>
						))}
					</section>
				</section>
			) : null}
		</>
	);
};
