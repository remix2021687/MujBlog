import { useContext } from "react"
import { CatergoryStateContext } from "../../Layout/AdminLayout/AdminLayout"
import { Dashboard } from "./components/Dashboard/Dashboard";

export const AdminPage = () => {
    const CatergoryValue = useContext(CatergoryStateContext);

    return (
        <section className="AdminPage">
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
        </section>
    )   
}