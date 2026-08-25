import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ThemeProvider } from '@/components/theme-provider';
import { Toaster } from '@/components/ui/sonner';
import { TooltipProvider } from '@/components/ui/tooltip';
import { ProtectedRoute } from '@/components/ProtectedRoute';
import { AuthProvider } from '@/context/AuthContext';
import { AdminLayout } from '@/layouts/AdminLayout';
import { PublicLayout } from '@/layouts/PublicLayout';
import { CatalogPage } from '@/pages/CatalogPage';
import { HomePage } from '@/pages/HomePage';
import { ProductDetailPage } from '@/pages/ProductDetailPage';
import { DashboardPage } from '@/pages/admin/DashboardPage';
import { LoginPage } from '@/pages/admin/LoginPage';
import { ProductFormPage } from '@/pages/admin/ProductFormPage';
import { ProductsListPage } from '@/pages/admin/ProductsListPage';
import { ProfilePage } from '@/pages/admin/ProfilePage';

function App() {
  return (
    <ThemeProvider defaultTheme="system" storageKey="theme">
      <AuthProvider>
        <BrowserRouter>
          <TooltipProvider>
            <Toaster />
            <Routes>
              <Route element={<PublicLayout />}>
                <Route index element={<HomePage />} />
                <Route path="catalogo" element={<CatalogPage />} />
                <Route path="products/:id" element={<ProductDetailPage />} />
              </Route>

              <Route path="/admin/login" element={<LoginPage />} />

              <Route element={<ProtectedRoute />}>
                <Route path="/admin" element={<AdminLayout />}>
                  <Route index element={<DashboardPage />} />
                  <Route path="profile" element={<ProfilePage />} />
                  <Route path="products" element={<ProductsListPage />} />
                  <Route path="products/new" element={<ProductFormPage />} />
                  <Route
                    path="products/:id/edit"
                    element={<ProductFormPage />}
                  />
                </Route>
              </Route>
            </Routes>
          </TooltipProvider>
        </BrowserRouter>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
