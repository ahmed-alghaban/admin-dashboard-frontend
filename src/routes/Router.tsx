import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { ProtectedRoute } from './ProtectedRoute'
import LoginPage from '@/features/auth/pages/LoginPage'
import HomePage from '@/pages/HomePage'
import MainLayout from '@/components/shared/MainLayout'

const Router = () => {
    return (
        <BrowserRouter>
            <div className="routes-container">
                <Routes>
                    <Route path="/" element={<MainLayout />}>
                        <Route path="/" element={<HomePage />} index />
                        <Route path="/login" element={<LoginPage />} />
                    </Route>
                    <Route path="/app" element={<ProtectedRoute />} />
                </Routes>
            </div>
        </BrowserRouter>

    )
}

export default Router
