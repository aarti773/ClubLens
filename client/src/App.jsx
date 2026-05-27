import EventsPage from "./pages/EventsPage";
import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import GalleryPage from "./pages/GalleryPage";
import SearchPage from "./pages/SearchPage";
import UploadPage from "./pages/UploadPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";


function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/events" element={<EventsPage />} />
      <Route path="/gallery" element={<GalleryPage />} />
      <Route path="/search" element={<SearchPage />} />
      <Route path="/upload" element={<UploadPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />


    </Routes>
  );
}

export default App;