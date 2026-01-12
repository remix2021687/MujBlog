import { motion } from "motion/react";
// import gasp from "gasp";
import { useGSAP } from "@gsap/react";
import moment from "moment/moment";
import {
	useGetPostSelfQuery,
	useGetPostPinSelfQuery,
} from "../../../redux/slices/api/PostsSlice";

export const Modal = ({ id, setReturnEvent, pinMode }) => {
	const { data: postData, isError: postDataError } = useGetPostSelfQuery(id);
	const { data: postDataPin, isError: isPinError } = useGetPostPinSelfQuery(id);

	// let split =

	const formateData = moment(
		pinMode ? postDataPin?.date_created : postData?.date_created
	).format("D.MM.YYYY");

	const ModalAnimation = {
		open: {
			width: "95%",
			height: "95%",
			y: 0,

			transition: {
				when: "beforeChildren",
				duraction: 2.5,
				staggerChildren: 0.1,
			},
		},
		close: {
			width: "5%",
			height: "5%",
			y: -100,

			transition: {
				duraction: 2.5,
				staggerChildren: 0.1,
				when: "afterChildren",
			},
		},
	};

	const ModalAnimationChildren = {
		open: {
			y: 0,
			opacity: 1,
		},
		close: {
			y: -15,
			opacity: 0,
		},
	};

	const ClickHendler = (event) => {
		setReturnEvent(event);
	};

	return (
		<>
			<motion.section
				className='Modal'
				variants={ModalAnimation}
				initial='close'
				animate='open'
				exit='close'
				transition={{
					ease: "easeInOut",
				}}>
				<section className='Modal_left'>
					<motion.img
						variants={ModalAnimationChildren}
						src={pinMode ? postDataPin?.photo : postData?.photo}
					/>
					<section className='Modal_left_header'>
						<motion.h1 variants={ModalAnimationChildren}>
							{pinMode ? postDataPin?.name : postData?.name}
						</motion.h1>

						<p>{pinMode ? postDataPin?.text : postData?.text}</p>
					</section>
				</section>
				<motion.section
					className='Modal_right'
					variants={ModalAnimationChildren}>
					<motion.section
						variants={ModalAnimationChildren}
						className='Modal_right_presonal'>
						<section>
							<h1>Auhor by</h1>
							<h3>
								{pinMode
									? postDataPin?.author.last_name
									: postData?.author.last_name}{" "}
								{pinMode
									? postDataPin?.author.first_name
									: postData?.author.first_name}
							</h3>
						</section>
						<motion.button
							variants={ModalAnimationChildren}
							onClick={ClickHendler}
							whileHover={{
								backgroundColor: "#ff0000",
								borderColor: "#ff0000",
								color: "#ffffff",
								boxShadow: "0 0 10px rgba(255, 0, 0, 0.5)",
							}}
							whileTap={{
								scale: 0.9,
							}}>
							Close
						</motion.button>
					</motion.section>
					<motion.h4 variants={ModalAnimationChildren}>
						<span>Created by</span> {formateData}
					</motion.h4>
				</motion.section>
			</motion.section>
		</>
	);
};
