import { useEffect } from "react"

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
        <Route Components={Components} />
    )
}