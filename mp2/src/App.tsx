import { Routes, Route } from "react-router-dom";
import ListView from "./pages/ListView";
import GalleryView from "./pages/GalleryView";
import DetailView from "./pages/DetailView";
import styles from "./App.module.css";

export default function App() {
  return (
    <div className={styles.app}>
      <Routes>
        <Route path="/" element={<ListView />} />
        <Route path="/gallery" element={<GalleryView />} />
        <Route path="/meal/:id" element={<DetailView />} />
      </Routes>
    </div>
  );
}

