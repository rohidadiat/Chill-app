import { Navigate, Routes, Route } from "react-router-dom";
import { useEffect } from "react";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import { useAuthStore } from "./store/useAuthStore";

function Protected({ children }) {
  const user = useAuthStore((state) => state.user);

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

function GuestOnly({ children }) {
  const user = useAuthStore((state) => state.user);

  if (user) {
    return <Navigate to="/" replace />;
  }

  return children;
}

function App() {
  const init = useAuthStore((state) => state.init);
  const initializing = useAuthStore((state) => state.initializing);

  useEffect(() => {
    init();
  }, [init]);

  if (initializing) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#181A1C] text-white">
        Memeriksa autentikasi...
      </div>
    );
  }

  return (
    <Routes>
      <Route
        path="/"
        element={
          <Protected>
            <Home />
          </Protected>
        }
      />

      <Route
        path="/login"
        element={
          <GuestOnly>
            <Login />
          </GuestOnly>
        }
      />

      <Route
        path="/register"
        element={
          <GuestOnly>
            <Register />
          </GuestOnly>
        }
      />

      <Route
        path="/profile"
        element={
          <Protected>
            <Profile />
          </Protected>
        }
      />

      {/* Semua URL yang tidak dikenal diarahkan ke login */}
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
}

export default App;
