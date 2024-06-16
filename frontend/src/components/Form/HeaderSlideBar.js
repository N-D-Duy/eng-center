import { Outlet } from "react-router-dom"
import Header from "./Header"
import { Sidebar } from "./Sidebar"

export const HeaderSlideBar = () => {
    return (<div>
        <Header />
        <Sidebar />
        
        <main id="main" class="main">
            <div> 
                <Outlet />
            </div>
        </main>
    </div>)
} 