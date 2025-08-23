import { Routes, Route, BrowserRouter } from "react-router-dom";
import MainLayout from "@/components/shared/MainLayout";
import { ProtectedRoute } from "@/routes/ProtectedRoute";
import { RoleGuard } from "@/guards/RoleGuard";

// Pages (stubs/placeholders — swap with your real components)
import HomePage from "@/pages/HomePage";
import LoginPage from "@/features/auth/pages/LoginPage";
import ForbiddenPage from "@/pages/ForbiddenPage";
import { UserPage } from "@/features/users/pages";
import ProductPage from "@/features/products/pages/ProductPage";
import CategoryPage from "@/features/categories/pages/CategoryPage";
import { OrderPage } from "@/features/orders/pages";
import { DashboardPage } from "@/features/analytics";
import AuditLogPage from "@/features/audit-logs/pages/AuditLogPage";

const Router = () => (
  <BrowserRouter>
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
              <DashboardPage />
            </RoleGuard>
          }
        />

        {/* Users (Admin only) */}
        <Route
          path="users"
          element={
            <RoleGuard roles={["Admin"]}>
              <UserPage />
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

        {/* Products */}
        <Route
          path="products"
          element={
            <RoleGuard roles={["Admin", "Manager"]}>
              <ProductPage />
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

        {/* Categories */}
        <Route
          path="categories"
          element={
            <RoleGuard roles={["Admin", "Manager", "Viewer"]}>
              <CategoryPage />
            </RoleGuard>
          }
        />

        {/* Orders */}
        <Route
          path="orders"
          element={
            <RoleGuard roles={["Admin", "Manager"]}>
              <OrderPage />
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

        {/* Audit Logs */}
        <Route
          path="audit-logs"
          element={
            <RoleGuard roles={["Admin"]}>
              <AuditLogPage />
            </RoleGuard>
          }
        />
      </Route>
    </Routes>
  </BrowserRouter>
);

export default Router;
