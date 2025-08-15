import { motion, AnimatePresence } from "motion/react";
import { useState } from "react";
import { GalleryPhotoModel } from "./components/GalleryPhotoModel";

export const GalleryPhoto = ({ id, name, photo }) => {
	const [selectPhotoID, setSelectPhotoID] = useState(null);

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

	return (
		<>
			<motion.section
				className='GalleryPhoto'
				layoutId={id}
				onClick={() => setSelectPhotoID(id)}
				variants={BlogBoxParant}
				initial='close'
				whileHover='open'
				whileTap={{ scale: 0.8 }}
				transition={{ ease: "easeInOut" }}>
				<img src={photo} alt={name} />
				<motion.h1 variants={BlogBoxChildren}>{name}</motion.h1>
			</motion.section>

			<AnimatePresence>
				{selectPhotoID && (
					<GalleryPhotoModel
						id={id}
						photo={photo}
						onClose={() => setSelectPhotoID(null)}
					/>
				)}
			</AnimatePresence>
		</>
	);
};
