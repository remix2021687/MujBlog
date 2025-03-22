import { useContext } from "react"
import { AnimatePresence } from "motion/react";
import { CatergoryStateContext } from "../../Layout/AdminLayout/AdminLayout"
import { Dashboard } from "./components/Dashboard/Dashboard";

export const AdminPage = () => {
    const CatergoryValue = useContext(CatergoryStateContext);

    return (
        <section className="AdminPage">
            <AnimatePresence>
                {(() => {
                    switch (CatergoryValue) {
                        case "Dashboard":
                            return <Dashboard />
                        
                        case "Posts":
                            break;

                        default:
                            return <Dashboard />
                    }
                })()}
            </AnimatePresence>
        </section>
    )   
}