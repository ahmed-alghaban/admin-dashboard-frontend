import { Routes, Route, BrowserRouter } from "react-router-dom";
import MainLayout from "@/components/shared/MainLayout";
import { ProtectedRoute } from "@/routes/ProtectedRoute";
import { RoleGuard } from "@/guards/RoleGuard";

// Pages (stubs/placeholders — swap with your real components)
import HomePage from "@/pages/HomePage";
import LoginPage from "@/features/auth/pages/LoginPage";
import ForbiddenPage from "@/pages/ForbiddenPage";

const Router = () => (
    <BrowserRouter>
        <div className="routes-container">
            <Routes>
                {/* Public */}
                <Route path="/" element={<MainLayout />}>
                    <Route index element={<HomePage />} />
                    <Route path="login" element={<LoginPage />} />
                </Route>

                {/* Auth-required area */}
                <Route path="/app" element={<ProtectedRoute />}>
                    {/* 403 target for RoleGuard redirects */}
                    <Route path="403" element={<ForbiddenPage />} />

                    {/* Dashboard (all authenticated roles) */}
                    <Route
                        path="dashboard"
                        element={
                            <RoleGuard roles={["Admin", "Manager", "Viewer"]}>
                                <div>Dashboard Page</div>
                            </RoleGuard>
                        }
                    />

                    {/* Users (Admin only) */}
                    <Route
                        path="users"
                        element={
                            <RoleGuard roles={["Admin"]}>
                                <div>Users Page</div>
                            </RoleGuard>
                        }
                    />
                    <Route
                        path="users/create"
                        element={
                            <RoleGuard roles={["Admin"]}>
                                <div>Create User Page</div>
                            </RoleGuard>
                        }
                    />
                    <Route
                        path="users/:id"
                        element={
                            <RoleGuard roles={["Admin"]}>
                                <div>User Details Page</div>
                            </RoleGuard>
                        }
                    />
                    <Route
                        path="users/:id/edit"
                        element={
                            <RoleGuard roles={["Admin"]}>
                                <div>Edit User Page</div>
                            </RoleGuard>
                        }
                    />

                    {/* Roles & Permissions (Admin only) */}
                    <Route
                        path="roles"
                        element={
                            <RoleGuard roles={["Admin"]}>
                                <div>Roles Page</div>
                            </RoleGuard>
                        }
                    />
                    <Route
                        path="roles/:id/edit"
                        element={
                            <RoleGuard roles={["Admin"]}>
                                <div>Edit Role Page</div>
                            </RoleGuard>
                        }
                    />

                    {/* Products */}
                    <Route
                        path="products"
                        element={
                            <RoleGuard roles={["Admin", "Manager", "Viewer"]}>
                                <div>Products List</div>
                            </RoleGuard>
                        }
                    />
                    <Route
                        path="products/:id"
                        element={
                            <RoleGuard roles={["Admin", "Manager", "Viewer"]}>
                                <div>Product Details</div>
                            </RoleGuard>
                        }
                    />
                    <Route
                        path="products/create"
                        element={
                            <RoleGuard roles={["Admin", "Manager"]}>
                                <div>Create Product</div>
                            </RoleGuard>
                        }
                    />
                    <Route
                        path="products/:id/edit"
                        element={
                            <RoleGuard roles={["Admin", "Manager"]}>
                                <div>Edit Product</div>
                            </RoleGuard>
                        }
                    />

                    {/* Categories */}
                    <Route
                        path="categories"
                        element={
                            <RoleGuard roles={["Admin", "Manager", "Viewer"]}>
                                <div>Categories List</div>
                            </RoleGuard>
                        }
                    />
                    <Route
                        path="categories/create"
                        element={
                            <RoleGuard roles={["Admin", "Manager"]}>
                                <div>Create Category</div>
                            </RoleGuard>
                        }
                    />
                    <Route
                        path="categories/:id/edit"
                        element={
                            <RoleGuard roles={["Admin", "Manager"]}>
                                <div>Edit Category</div>
                            </RoleGuard>
                        }
                    />

                    {/* Inventory */}
                    <Route
                        path="inventory"
                        element={
                            <RoleGuard roles={["Admin", "Manager", "Viewer"]}>
                                <div>Inventory List</div>
                            </RoleGuard>
                        }
                    />
                    <Route
                        path="inventory/adjust"
                        element={
                            <RoleGuard roles={["Admin", "Manager"]}>
                                <div>Adjust Inventory</div>
                            </RoleGuard>
                        }
                    />
                    <Route
                        path="inventory/:productId"
                        element={
                            <RoleGuard roles={["Admin", "Manager", "Viewer"]}>
                                <div>Inventory Detail</div>
                            </RoleGuard>
                        }
                    />

                    {/* Orders */}
                    <Route
                        path="orders"
                        element={
                            <RoleGuard roles={["Admin", "Manager", "Viewer"]}>
                                <div>Orders List</div>
                            </RoleGuard>
                        }
                    />
                    <Route
                        path="orders/create"
                        element={
                            <RoleGuard roles={["Admin", "Manager"]}>
                                <div>Create Order</div>
                            </RoleGuard>
                        }
                    />
                    <Route
                        path="orders/:id"
                        element={
                            <RoleGuard roles={["Admin", "Manager", "Viewer"]}>
                                <div>Order Details</div>
                            </RoleGuard>
                        }
                    />
                    <Route
                        path="orders/:id/edit"
                        element={
                            <RoleGuard roles={["Admin", "Manager"]}>
                                <div>Edit Order</div>
                            </RoleGuard>
                        }
                    />
                    <Route
                        path="orders/:id/status"
                        element={
                            <RoleGuard roles={["Admin", "Manager"]}>
                                <div>Update Order Status</div>
                            </RoleGuard>
                        }
                    />

                    {/* Analytics */}
                    <Route
                        path="analytics"
                        element={
                            <RoleGuard roles={["Admin", "Manager", "Viewer"]}>
                                <div>Analytics Overview</div>
                            </RoleGuard>
                        }
                    />

                    {/* Audit Logs */}
                    <Route
                        path="audit-logs"
                        element={
                            <RoleGuard roles={["Admin"]}>
                                <div>Audit Logs</div>
                            </RoleGuard>
                        }
                    />

                    {/* Settings */}
                    <Route
                        path="settings"
                        element={
                            <RoleGuard roles={["Admin"]}>
                                <div>Settings Page</div>
                            </RoleGuard>
                        }
                    />
                </Route>
            </Routes>
        </div>
    </BrowserRouter>
);

export default Router;
