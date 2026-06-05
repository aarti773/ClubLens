import MyPhotosPage from "./pages/MyPhotosPage";
import EventsPage from "./pages/EventsPage";
import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import GalleryPage from "./pages/GalleryPage";
import SearchPage from "./pages/SearchPage";
import UploadPage from "./pages/UploadPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import DashboardPage from "./pages/DashboardPage";
import EventDetailPage from "./pages/EventDetailPage";
import CreateEventPage from "./pages/CreateEventPage";
import AdminUsersPage from "./pages/AdminUsersPage";
import ProtectedRoute from "./components/ProtectedRoute";
import FavouritesPage from "./pages/FavouritesPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/events" element={<EventsPage />} />
      <Route path="/gallery" element={<GalleryPage />} />
      <Route path="/search" element={<SearchPage />} />
      <Route path="/my-photos" element={<MyPhotosPage />} />
      <Route
        path="/favourites"
        element={
          <ProtectedRoute>
            <FavouritesPage />
          </ProtectedRoute>
        }
      />
      <Route path="/upload" element={<UploadPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />

      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <DashboardPage />
          </ProtectedRoute>
        }
      />

      <Route
        path="/create-event"
        element={
          <ProtectedRoute>
            <CreateEventPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/users"
        element={
          <ProtectedRoute>
            <AdminUsersPage />
          </ProtectedRoute>
        }
      />
      <Route path="/events/:id" element={<EventDetailPage />} />
    </Routes>
  );
}

export default App;
