import '@/lib/errorReporter';
import { enableMapSet } from "immer";
enableMapSet();
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { ErrorBoundary } from '@/components/ErrorBoundary';
import { RouteErrorBoundary } from '@/components/RouteErrorBoundary';
import 'yet-another-react-lightbox/styles.css';
import '@/index.css'
import { App } from '@/App';
import { HomePage } from '@/pages/HomePage';
import { AboutPage } from '@/pages/AboutPage';
import { MapPage } from '@/pages/MapPage';
import { PoetsPage } from '@/pages/PoetsPage';
import { GalleryPage } from '@/pages/GalleryPage';
import { EventsPage } from '@/pages/EventsPage';
import { ContactPage } from '@/pages/ContactPage';
import { HelmetProvider } from 'react-helmet-async';
// Admin imports
import { AdminLoginPage } from '@/pages/admin/AdminLoginPage';
import { AdminLayout } from '@/components/admin/AdminLayout';
import { ProtectedRoute } from '@/components/admin/ProtectedRoute';
import { AdminDashboardPage } from '@/pages/admin/AdminDashboardPage';
import { ManagePoetsPage } from '@/pages/admin/ManagePoetsPage';
import { ManageGalleryPage } from '@/pages/admin/ManageGalleryPage';
import { ManageEventsPage } from '@/pages/admin/ManageEventsPage';
import { SettingsPage } from '@/pages/admin/SettingsPage';
import { AnalyticsPage } from '@/pages/admin/AnalyticsPage';
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <RouteErrorBoundary />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "o-projekte", element: <AboutPage /> },
      { path: "mapa", element: <MapPage /> },
      { path: "basnici/:poetId?", element: <PoetsPage /> },
      { path: "galeria", element: <GalleryPage /> },
      { path: "podujatia", element: <EventsPage /> },
      { path: "kontakt", element: <ContactPage /> },
    ]
  },
  {
    path: "/admin",
    errorElement: <RouteErrorBoundary />,
    children: [
      { path: "login", element: <AdminLoginPage /> },
      {
        element: <ProtectedRoute />,
        children: [
          {
            element: <AdminLayout />,
            children: [
              { path: "dashboard", element: <AdminDashboardPage /> },
              { path: "analytics", element: <AnalyticsPage /> },
              { path: "poets", element: <ManagePoetsPage /> },
              { path: "gallery", element: <ManageGalleryPage /> },
              { path: "events", element: <ManageEventsPage /> },
              { path: "settings", element: <SettingsPage /> },
            ]
          }
        ]
      }
    ]
  }
]);
// Do not touch this code
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ErrorBoundary>
      <HelmetProvider>
        <RouterProvider router={router} />
      </HelmetProvider>
    </ErrorBoundary>
  </StrictMode>,
)