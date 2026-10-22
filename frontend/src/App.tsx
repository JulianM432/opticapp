import {
  createBrowserRouter,
  Outlet,
  RouterProvider,
  ScrollRestoration,
} from 'react-router-dom';
import { ThemeProvider } from '@/components/theme-provider';
import { Toaster } from '@/components/ui/sonner';
import { TooltipProvider } from '@/components/ui/tooltip';
import { ProtectedRoute } from '@/components/ProtectedRoute';
import { AuthProvider } from '@/context/AuthContext';
import { AdminLayout } from '@/layouts/AdminLayout';
import { PublicLayout } from '@/layouts/PublicLayout';
import { CatalogPage } from '@/pages/CatalogPage';
import { HomePage } from '@/pages/HomePage';
import { NotFoundPage } from '@/pages/NotFoundPage';
import { ProductDetailPage } from '@/pages/ProductDetailPage';
import { DashboardPage } from '@/pages/admin/DashboardPage';
import { LoginPage } from '@/pages/admin/LoginPage';
import { ProductFormPage } from '@/pages/admin/ProductFormPage';
import { ProductsListPage } from '@/pages/admin/ProductsListPage';
import { ProfilePage } from '@/pages/admin/ProfilePage';

// Data router: `viewTransition` on links and <ScrollRestoration> only work in this mode.
function RootLayout() {
  return (
    <>
      <ScrollRestoration />
      <Outlet />
    </>
  );
}

const router = createBrowserRouter([
  {
    element: <RootLayout />,
    children: [
      {
        element: <PublicLayout />,
        children: [
          { index: true, element: <HomePage /> },
          { path: 'catalogo', element: <CatalogPage /> },
          { path: 'products/:id', element: <ProductDetailPage /> },
          { path: '*', element: <NotFoundPage /> },
        ],
      },
      { path: '/admin/login', element: <LoginPage /> },
      {
        element: <ProtectedRoute />,
        children: [
          {
            path: '/admin',
            element: <AdminLayout />,
            children: [
              { index: true, element: <DashboardPage /> },
              { path: 'profile', element: <ProfilePage /> },
              { path: 'products', element: <ProductsListPage /> },
              { path: 'products/new', element: <ProductFormPage /> },
              { path: 'products/:id/edit', element: <ProductFormPage /> },
            ],
          },
        ],
      },
    ],
  },
]);

function App() {
  return (
    <ThemeProvider defaultTheme="system" storageKey="theme">
      <AuthProvider>
        <TooltipProvider>
          <Toaster />
          <RouterProvider router={router} />
        </TooltipProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
