import { Outlet } from "react-router-dom"
import Header from "./Header"
import { Sidebar } from "./Sidebar"

export const HeaderSlideBar = () => {
    return (<>
        <Header />
        <Sidebar />
        <div>
            <Outlet />
        </div>
    </>)
}