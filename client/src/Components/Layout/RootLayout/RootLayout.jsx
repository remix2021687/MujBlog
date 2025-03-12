import { Header } from "./Components/Header/Header"

export const RootLayout = ({ children }) => {
    return (
        <>
            <Header />
            <main>
                {children}
            </main>
        </>
    )
}