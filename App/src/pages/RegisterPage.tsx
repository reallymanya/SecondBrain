import { useNavigate } from "react-router-dom";
import { BackgroundBeams } from "@/components/ui/background-beams";
import { Input } from "@/components/ui/input";
import { GlowingButton } from "@/components/ui/glowing-button";
import { motion } from "framer-motion";
import { ArrowLeft, CheckCircle, Sparkles } from "lucide-react";
import { useState } from "react";

const RegisterPage = () => {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  async function handleSubmit(e: any) {
    e.preventDefault();
    setError("");
    setLoading(true);

    const form = e.currentTarget;
    const username = form.username.value;
    const email = form.email.value;
    const password = form.password.value;

    if (!username || !email || !password) {
      setError("Please fill in all fields");
      setLoading(false);
      return;
    }

    const data = { username, email, password };

    try {
      const res = await fetch("http://localhost:3001/api/v1/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(data),
      });

      if (res.ok) {
        setSuccess(true);
        setTimeout(() => navigate("/login"), 2000);
      } else {
        const errorData = await res.json();
        setError(errorData.message || "Account already exists");
      }
    } catch (err) {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen w-full bg-[#030014] flex items-center justify-center relative overflow-hidden font-sans">
      <BackgroundBeams className="opacity-20" />

      {/* Subtle Glows */}
      <div className="absolute top-[-20%] left-[-20%] w-[50%] h-[50%] bg-purple-500/10 rounded-full blur-[150px]" />
      <div className="absolute bottom-[-20%] right-[-20%] w-[50%] h-[50%] bg-blue-500/10 rounded-full blur-[150px]" />

      <div className="relative z-10 w-full max-w-md mx-auto px-6">
        <motion.button
          onClick={() => navigate("/")}
          className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors mb-8 group"
          whileHover={{ x: -2 }}
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          <span className="text-sm font-medium">Back</span>
        </motion.button>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="backdrop-blur-2xl bg-white/[0.02] border border-white/5 rounded-3xl p-8 shadow-2xl relative overflow-hidden"
        >
          {/* Top light effect */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-1 bg-gradient-to-r from-transparent via-purple-500 to-transparent blur-sm" />

          {success ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-12"
            >
              <div className="w-20 h-20 bg-green-500/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="w-10 h-10 text-green-400" />
              </div>
              <h2 className="text-3xl font-bold font-heading text-white mb-2">Welcome Aboard</h2>
              <p className="text-slate-400 mb-6">Redirecting to your secure vault...</p>
              <div className="w-12 h-1 bg-purple-500/50 rounded-full mx-auto overflow-hidden">
                <div className="w-full h-full bg-purple-400 animate-shimmer" />
              </div>
            </motion.div>
          ) : (
            <>
              <div className="mb-10 text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-tr from-purple-500/20 to-blue-500/20 mb-6 border border-white/5">
                  <Sparkles className="w-6 h-6 text-purple-400" />
                </div>
                <h1 className="text-3xl font-bold font-heading text-white mb-2">Create Account</h1>
                <p className="text-slate-400 text-sm">Join the elite knowledge network.</p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5">
                {error && (
                  <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-3 text-red-400 text-xs text-center">
                    {error}
                  </div>
                )}

                <div className="space-y-4">
                  <Input
                    name="username"
                    placeholder="Username"
                    className="bg-white/[0.03] border-white/10 h-12 text-white placeholder:text-slate-600 focus:border-purple-500/50 focus:bg-white/[0.05]"
                  />
                  <Input
                    name="email"
                    type="email"
                    placeholder="Email address"
                    className="bg-white/[0.03] border-white/10 h-12 text-white placeholder:text-slate-600 focus:border-purple-500/50 focus:bg-white/[0.05]"
                  />
                  <Input
                    name="password"
                    type="password"
                    placeholder="Password"
                    className="bg-white/[0.03] border-white/10 h-12 text-white placeholder:text-slate-600 focus:border-purple-500/50 focus:bg-white/[0.05]"
                  />
                </div>

                <div className="pt-2">
                  <GlowingButton type="submit" className="w-full" disabled={loading}>
                    {loading ? "Processing..." : "Create Account"}
                  </GlowingButton>
                </div>

                <p className="text-center text-xs text-slate-500 mt-6">
                  Already a member?{" "}
                  <button onClick={() => navigate("/login")} className="text-purple-400 hover:text-purple-300 transition-colors">
                    Sign in
                  </button>
                </p>
              </form>
            </>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default RegisterPage;
