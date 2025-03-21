import { LeftHeader } from "./components/LeftHeader"
import { useState, createContext } from 'react'

export const CatergoryStateContext = createContext(null);

export const AdminLayout = ({ children }) => {
    const [stateValue, setStateValue] = useState();

    const CatergoryValue = (value) => {
        setStateValue(value)
    }

    return (
        <>
            <main className="AdminLayout">
                <LeftHeader setCatergoryState={CatergoryValue} />
                <CatergoryStateContext.Provider value={stateValue}>
                    {children}
                </CatergoryStateContext.Provider>
            </main>
        </>
    )
}