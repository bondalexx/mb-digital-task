import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { loginThunk } from "../features/auth/authSlice";
import { validateEmail, validatePassword } from "../utils/valid";
import { Link, useNavigate } from "react-router-dom";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<{ email?: string; password?: string }>(
    {}
  );
  const dispatch = useAppDispatch();
  const { loading, error } = useAppSelector((s) => s.auth);
  const navigate = useNavigate();

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const e1 = validateEmail(email);
    const e2 = validatePassword(password);
    setErrors({ email: e1, password: e2 });
    if (e1 || e2) return;
    const res = await dispatch(loginThunk({ email, password }));
    if (loginThunk.fulfilled.match(res)) navigate("/");
  };

  return (
    <div style={{ maxWidth: 420, margin: "24px auto" }}>
      <h2>Логін</h2>
      <form onSubmit={onSubmit}>
        <label>
          Email
          <input value={email} onChange={(e) => setEmail(e.target.value)} />
        </label>
        {errors.email && <div className="err">{errors.email}</div>}
        <label>
          Пароль
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        {errors.password && <div className="err">{errors.password}</div>}
        {error && <div className="err">{error}</div>}
        <button className="btn btn--primary" disabled={loading}>
          {loading ? "Вхід…" : "Увійти"}
        </button>
      </form>
      <p>
        Немає акаунта? <Link to="/register">Зареєструватися</Link>
      </p>
    </div>
  );
}
