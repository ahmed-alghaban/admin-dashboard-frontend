import { AppSidebar } from '../app-sidebar'
import { Outlet } from 'react-router-dom'

const AppLayout = () => {
    return (
        <>
            <AppSidebar />
            <main>
                <Outlet />
            </main>
        </>
    )
}

export default AppLayout
