import { Link, Route, Routes, useNavigate } from "react-router-dom";
import CoursesPage from "./pages/CoursesPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ProtectedRoute from "./routes/ProtectedRoute";
import { useAppDispatch, useAppSelector } from "./store/hooks";
import { logout } from "./features/auth/authSlice";
import "./styles/global.css";
import MyCoursesPage from "./pages/MyCoursesPage";

export default function App() {
  const user = useAppSelector((s) => s.auth.user);
  const ownedCount = useAppSelector((s) => s.purchases.purchasedIds.length);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const onLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  return (
    <div className="app">
      <header className="header">
        <Link to="/" className="logo">
          CourseHub
        </Link>
        <nav className="nav">
          {user && (
            <Link to="/my" className="btn">
              Мої курси ({ownedCount})
            </Link>
          )}
          {user ? (
            <>
              <span className="nav__user">{user.email}</span>
              <button className="btn" onClick={onLogout}>
                Вийти
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="btn">
                Логін
              </Link>
              <Link to="/register" className="btn btn--primary">
                Реєстрація
              </Link>
            </>
          )}
        </nav>
      </header>

      <main className="container">
        <Routes>
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <CoursesPage />
              </ProtectedRoute>
            }
          />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route
            path="/my"
            element={
              <ProtectedRoute>
                <MyCoursesPage />
              </ProtectedRoute>
            }
          />
        </Routes>
      </main>

      <footer className="footer">© {new Date().getFullYear()} CourseHub</footer>
    </div>
  );
}
