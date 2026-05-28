import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import {
  ArrowRight,
  Mail,
  Lock,
  User,
  Sparkles,
} from "lucide-react";


function AuthPage() {

  const [mode, setMode] = useState("login");

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const isRegister = mode === "register";

  const handleSubmit = async (e) => {

    e.preventDefault();

    const endpoint =
      mode === "register"
        ? `${import.meta.env.VITE_API_URL}/register`
        : `${import.meta.env.VITE_API_URL}/login`;

    try {

      const res = await fetch(endpoint, {

        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify(
          mode === "register"
            ? {
                name,
                email,
                password,
              }
            : {
                email,
                password,
              }
        ),
      });

      const data = await res.json();

      localStorage.setItem("token", data.token);
localStorage.setItem("user", JSON.stringify(data.user));

      if (!res.ok) {

        alert(data.error || "Something went wrong");

        return;
      }

      // LOGIN
      if (mode === "login") {

  localStorage.setItem(
    "token",
    data.token
  );

  localStorage.setItem(
    "user",
    JSON.stringify(data.user)
  );

  alert("Login successful");

  navigate("/");
}

      // REGISTER
      else {

        alert("Account created successfully");

        setMode("login");

        setName("");
        setEmail("");
        setPassword("");
      }

    } catch (err) {

      console.error(err);

      alert("Server error");
    }
  };

  return (
    <main className="relative min-h-screen w-full overflow-hidden bg-gradient-to-br from-[#f5f3ff] via-[#eef2ff] to-[#e0f2fe] flex items-center justify-center px-4 py-12">

      {/* Ambient blobs */}
      <div className="pointer-events-none absolute -top-32 -left-32 w-[480px] h-[480px] rounded-full bg-indigo-300/30 blur-3xl" />

      <div className="pointer-events-none absolute -bottom-32 -right-32 w-[520px] h-[520px] rounded-full bg-violet-300/30 blur-3xl" />

      <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full bg-sky-200/40 blur-3xl" />

      <div className="relative z-10 w-full max-w-md flex flex-col items-center">

        {/* Card */}
        <div className="w-full rounded-3xl border border-white/60 bg-white/70 backdrop-blur-xl shadow-[0_32px_64px_-16px_rgba(79,70,229,0.18)] p-8 md:p-10">

          {/* Logo */}
          <div className="flex items-center justify-center gap-2.5 mb-8">

            <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-indigo-600 to-violet-600 flex items-center justify-center shadow-[0_8px_20px_-6px_rgba(99,102,241,0.5)]">

              <Sparkles className="w-5 h-5 text-white" />

            </div>

            <span className="text-xl font-bold tracking-tight text-slate-900">
              Trackora
            </span>

          </div>

          {/* Heading */}
          <div className="text-center mb-8">

            <h1 className="text-3xl font-bold tracking-tight text-slate-900 mb-2">

              {isRegister
                ? "Create your account"
                : "Welcome back"}

            </h1>

            <p className="text-sm text-slate-500">
              Track internships, coding prep,
              and consistency in one place.
            </p>

          </div>

          {/* Form */}
          <form
            onSubmit={handleSubmit}
            className="space-y-5"
          >

            {isRegister && (

              <Field
                label="Name"
                icon={User}
                type="text"
                placeholder="Jane Student"
                autoComplete="name"
                value={name}
                onChange={(e) =>
                  setName(e.target.value)
                }
              />

            )}

            <Field
              label="Email"
              icon={Mail}
              type="email"
              placeholder="you@example.com"
              autoComplete="email"
              value={email}
              onChange={(e) =>
                setEmail(e.target.value)
              }
            />

            <Field
              label="Password"
              icon={Lock}
              type="password"
              placeholder="••••••••"
              autoComplete={
                isRegister
                  ? "new-password"
                  : "current-password"
              }
              value={password}
              onChange={(e) =>
                setPassword(e.target.value)
              }
            />

            <button
              type="submit"
              className="group w-full h-12 rounded-2xl bg-gradient-to-r from-indigo-600 to-violet-600 text-white font-semibold flex items-center justify-center gap-2 shadow-[0_12px_32px_-8px_rgba(99,102,241,0.5)] hover:shadow-[0_16px_40px_-8px_rgba(99,102,241,0.6)] hover:-translate-y-0.5 transition-all duration-300"
            >

              <span>
                {isRegister
                  ? "Create Account"
                  : "Login"}
              </span>

              <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />

            </button>

          </form>

          {/* Divider */}
          <div className="flex items-center gap-3 my-6">

            <div className="h-px flex-1 bg-slate-200/70" />

            <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-400">
              or
            </span>

            <div className="h-px flex-1 bg-slate-200/70" />

          </div>

          {/* Toggle */}
          <p className="text-center text-sm text-slate-500">

            {isRegister
              ? "Already have an account?"
              : "Don't have an account?"}{" "}

            <button
              type="button"
              onClick={() =>
                setMode(
                  isRegister
                    ? "login"
                    : "register"
                )
              }
              className="font-semibold text-indigo-600 hover:text-indigo-700 transition-colors"
            >

              {isRegister
                ? "Login"
                : "Register"}

            </button>

          </p>

        </div>

        {/* Footer */}
        <Link
          to="/"
          className="mt-6 text-xs font-medium text-slate-400 hover:text-slate-600 transition-colors"
        >
          ← Back to home
        </Link>

      </div>
    </main>
  );
}

function Field({
  label,
  icon: Icon,
  type,
  placeholder,
  autoComplete,
  value,
  onChange,
}) {

  return (
    <div className="space-y-1.5">

      <label className="text-xs font-semibold uppercase tracking-wider text-slate-500">
        {label}
      </label>

      <div className="relative">

        <Icon className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />

        <input
          type={type}
          placeholder={placeholder}
          autoComplete={autoComplete}
          value={value}
          onChange={onChange}
          className="w-full h-12 pl-11 pr-4 rounded-2xl bg-white/80 border border-slate-200 text-sm text-slate-800 placeholder:text-slate-400 outline-none focus:ring-2 focus:ring-indigo-500/40 focus:border-indigo-400 transition-all"
        />

      </div>
    </div>
  );
}

export default AuthPage;