import { useEffect } from "react"
import { ToastContainer } from "react-toastify";

export const App = ({ Route, Components }) => {
    useEffect(() => {
        document.addEventListener('wheel', (event) => {
            if (event.ctrlKey) {
                event.preventDefault();
            }
        }, {passive: false})

        return () => {
            document.removeEventListener('wheel', (event) => {
                if (event.ctrlKey) {
                    event.preventDefault();
                }
            })
        }
    }, [])


    return (
        <>
            <ToastContainer />
            <Route Components={Components} />
        </>
    )
}