import { LeftHeader } from "./components/LeftHeader"

export const AdminLayout = ({ children }) => {
    return (
        <>
            <main className="AdminLayout">
                <LeftHeader />
                {children}
            </main>
        </>
    )
}