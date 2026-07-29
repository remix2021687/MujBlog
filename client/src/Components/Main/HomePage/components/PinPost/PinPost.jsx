import { BlogBox } from "../../../../Layout/BlogBox/BlogBox";
import { useGetPostPinQuery } from "../../../../../redux/slices/api/PostsSlice";
import { TrueFocus } from "../../../../Layout/TrueFocus/TrueFocus";

export const PinPost = () => {
	const { data: pinData = [], isLoading } = useGetPostPinQuery();

	return (
		<>
			{pinData?.length > 0 ? (
				<section className="PinPost">
					{/* TrueFocus Component for PinPost For testing */}
					<TrueFocus
						sentence="Favorite Posts"
						manualMode={false}
						blurAmount={5}
						borderColor="white"
						glowColor="rgba(255, 255, 255, 1)"
						animationDuration={0.5}
						pauseBetweenAnimations={2}
					/>
					<section className="PinPost_content">
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
