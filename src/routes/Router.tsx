import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { ProtectedRoute } from './ProtectedRoute'
import LoginPage from '@/features/auth/pages/LoginPage'

const Router = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<ProtectedRoute />} />
                <Route path="/app/login" element={<LoginPage />} />
            </Routes>
        </BrowserRouter>

    )
}

export default Router
