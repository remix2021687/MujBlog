import { BlogBox } from "../../Layout/BlogBox/BlogBox";
import { PinPost } from "./components/PinPost/PinPost";
import { useGetPostsQuery } from "../../../redux/slices/api/PostsSlice";

export const HomePage = () => {
	const { data: postsData, isLoading } = useGetPostsQuery();

	return (
		<section className='HomePage'>
			<PinPost />
			{postsData ? (
				postsData.map((data, index) => (
					<BlogBox
						key={index + 1}
						id={data.id}
						name={data.name}
						image={data.photo}
						display_description={data.display_description}
					/>
				))
			) : (
				<h1>Posts not Loaded</h1>
			)}
		</section>
	);
};
