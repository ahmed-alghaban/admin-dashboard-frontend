import { LandingNavbar } from './LandingNavbar'
import { Outlet, useLocation } from 'react-router-dom'

const MainLayout = () => {
    const location = useLocation();

    return (
        <div>
            <LandingNavbar />
            <div
                key={location.pathname}
                className="animate-in fade-in-0 slide-in-from-bottom-4 duration-300 ease-out"
            >
                <Outlet />
            </div>
        </div>
    )
}

export default MainLayout
