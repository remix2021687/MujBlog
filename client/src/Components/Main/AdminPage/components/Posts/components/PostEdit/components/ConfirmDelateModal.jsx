import { useEffect } from "react";
import { motion } from "motion/react"
import { toast } from 'react-toastify';
import { useDeletePostAdminMutation } from "../../../../../../../../redux/slices/api/AdminSlice";
import { useDispatch } from "react-redux";
import { closeDeleteModel } from "../../../../../../../../redux/slices/DeleteModelSlice";

export const ConfirmDelateModal = ({ id, name }) => {
    const dispatch = useDispatch();

    const [DeletePostAdmin, {
        isLoading, 
        isSuccess, 
        isError 
    }] = useDeletePostAdminMutation();

    const ConfirmDelateModalParent = {
        open: {
            opacity: 1,

            transition: {
                duraction: 0.5,
                staggerChildren: 0.08,
                delayChildren: 0.1
            }
        },

        close: {
            opacity: 0,
        }
    }

    const ConfirmDelateModalPerChild = {
        open: {
            opacity: 1,
            y: 0,

            transition: {
                duraction: 0.5,
                staggerChildren: 0.08,
                delayChildren: 0.1
            }
        },

        close: {
            opacity: 0,
            y: -15,

        }
    }

    const ConfirmDelateModalChild = {
        open: {
            opacity: 1,
            y: 0,
        },

        close: {
            opacity: 0,
            y: -15,

        }
    }

    const DeleteBtn = () => {
        DeletePostAdmin(id)
        dispatch(closeDeleteModel());
    }

    useEffect(() => {
        if (isLoading) {
            toast.loading('Deleting post...', {
                position: 'top-right',
                closeOnClick: true,
                draggable: true,
                pauseOnHover: false,
                autoClose: 3000,
            })
        } 
        else if (isSuccess) {
            toast.success('Post deleted successfully!', {
                position: 'top-right',
                closeOnClick: false,
                draggable: true,
                pauseOnHover: false,
                autoClose: 3000,
            })
        } 
        else if (isError) {
            toast.error("Post deletion failed!", {
                position: 'top-right',
                closeOnClick: false,
                draggable: true,
                pauseOnHover: false,
                autoClose: 3000,
            })
        }
    }, [isLoading, isSuccess, isError]);

    return (
        <>
            <motion.section 
                className="ConfirmDelateModal"
                variants={ConfirmDelateModalParent}
                initial={"close"}
                animate={"open"}
                exit={"close"}

            >
                <motion.section 
                    className="ConfirmDelateModal_modal"
                    variants={ConfirmDelateModalPerChild}
                >
                    <section className="ConfirmDelateModal_modal_header">
                        <motion.h2 variants={ConfirmDelateModalChild}>Confirm to delete post ?</motion.h2>
                        <motion.p variants={ConfirmDelateModalChild}>Do you really want to remove <b>{name}</b> ?</motion.p>
                    </section>
                    <section className="ConfirmDelateModal_modal_button">
                        <motion.button 
                            variants={ConfirmDelateModalChild} 
                            className="del"
                            whileHover={{
                                scale: 1.05,
                                backgroundColor: '#ff0000',
                                color: '#ffffff'
                            }}
                            whileTap={{scale: 0.9}}
                            onClick={DeleteBtn}
                            
                        >
                            Delete
                        </motion.button>
                        <motion.button 
                            variants={ConfirmDelateModalChild}
                            className="cancel"
                            whileHover={{
                                scale: 1.05,
                                backgroundColor: '#008000',
                                color: '#ffffff'
                            }}
                            whileTap={{scale: 0.9}}
                            onClick={() => dispatch(closeDeleteModel())}
                        >
                            Cancel
                        </motion.button>
                    </section>
                </motion.section>
            </motion.section>
        </>
    )
}