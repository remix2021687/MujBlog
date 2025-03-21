import { User, Note } from "@phosphor-icons/react"
import { InfoBlocks } from "./components/InfoBlocks"

export const Dashboard = () => {
    return (
        <section className="Dashboard">
            <h1>Dashboard</h1>

            <section className="Dashboard_content">
                <section className="Dashboard_content_header">
                    <InfoBlocks 
                        name={"User"}
                        count={"40 690"}
                        icon={<User size={40} />}
                        BgColorIcon={"#8280FF"}
                        colorIcon={'white'}
                    />

                    <InfoBlocks 
                        name={"Posts"}
                        count={"40 690"}
                        icon={<Note size={40} />}
                        BgColorIcon={"#FEC53D"}
                        colorIcon={'white'}
                    />    
                </section>
            </section>
        </section>
    )
}