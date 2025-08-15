import { AnimatePresence } from "motion/react";
import { useSelector } from "react-redux";
import { Dashboard } from "./components/Dashboard/Dashboard";
import { Posts } from "./components/Posts/Posts";
import { Create } from "./components/Create/Create";

export const AdminPage = () => {
    const CatergoryValue = useSelector(state => state.category.value);


    return (
        <section className="AdminPage">
            <AnimatePresence>
                {(() => {
                    switch (CatergoryValue) {
                        case "Dashboard":
                            return <Dashboard />
                        
                        case "Posts":
                            return <Posts />

                        case "Create":
                            return <Create />

                        default:
                            return <Dashboard />
                    }
                })()}
            </AnimatePresence>
        </section>
    )   
}