import { lazy } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Layout from "./Layout";

const EventsPage = lazy(() => import("./pages/EventsPage/EventsPage"));
const GuestsPage = lazy(() => import("./pages/GuestsPage/GuestsPage"));
const CreateGuestPage = lazy(() =>
  import("./pages/CreateGuestPage/CreateGuestPage")
);

function App() {
  return (
    <Layout>
      <Toaster position="bottom-center" />
      <Routes>
        <Route path="/" element={<EventsPage />} />
        <Route path="/:id/guests" element={<GuestsPage />} />
        <Route path="/:id/createGuest" element={<CreateGuestPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Layout>
  );
}

export default App;
