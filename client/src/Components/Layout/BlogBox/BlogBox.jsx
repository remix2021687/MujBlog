import { motion, AnimatePresence } from "motion/react";
import { Modal } from "../Modal/Modal";
import { useState } from "react";
import { useEffect } from "react";

export const BlogBox = ({
	id,
	name,
	image,
	display_description,
	pinMode = false,
}) => {
	const [IsOpenModal, setIsOpenModal] = useState(false);
	const [returnEvent, setReturnEvent] = useState();

	const BlogBoxParant = {
		open: {
			scale: 1.03,
			transition: {
				duraction: 0.5,
				staggerChildren: 0.08,
				delayChildren: 0.1,
			},
		},
		close: {
			transition: {
				duraction: 0.2,
				staggerChildren: 0.07,
				delayChildren: -1,
			},
		},
	};

	const BlogBoxChildren = {
		open: {
			y: 0,
			opacity: 1,
		},

		close: {
			y: -15,
			opacity: 0,
		},
	};

	useEffect(() => {
		if (returnEvent) {
			setIsOpenModal(false);
		} else if (returnEvent === false) {
			setIsOpenModal(false);
		}
	}, [returnEvent]);

	return (
		<>
			<AnimatePresence>
				{IsOpenModal && (
					<Modal id={id} setReturnEvent={setReturnEvent} pinMode={pinMode} />
				)}
			</AnimatePresence>
			<motion.section
				className='BlogBox'
				initial='close'
				whileHover='open'
				whileTap={{ scale: 0.9 }}
				variants={BlogBoxParant}
				onClick={() => setIsOpenModal(true)}>
				<img src={image} alt={name} />
				<section className='Blogbox_content'>
					<motion.h2 variants={BlogBoxChildren}>{name}</motion.h2>
					<motion.h4 variants={BlogBoxChildren}>
						{display_description}
					</motion.h4>
				</section>
			</motion.section>
		</>
	);
};
