import { LandingNavbar } from './LandingNavbar'
import { Outlet } from 'react-router-dom'

const MainLayout = () => {
    return (
        <div>
            <LandingNavbar />
            <Outlet />
        </div>
    )
}

export default MainLayout
