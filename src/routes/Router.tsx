import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { ProtectedRoute } from './ProtectedRoute'
import LoginPage from '@/features/auth/pages/LoginPage'
import HomePage from '@/pages/HomePage'

const Router = () => {
    return (
        <BrowserRouter>
            <div className="routes-container">
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/app" element={<ProtectedRoute />} />
                    <Route path="/login" element={<LoginPage />} />
                </Routes>
            </div>
        </BrowserRouter>

    )
}

export default Router
