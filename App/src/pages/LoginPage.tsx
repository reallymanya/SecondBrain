import { useNavigate } from "react-router-dom";
import { BackgroundBeams } from "@/components/ui/background-beams";
import { Input } from "@/components/ui/input";
import { GlowingButton } from "@/components/ui/glowing-button";
import { motion } from "framer-motion";
import { ArrowLeft, Lock } from "lucide-react";
import { useState } from "react";

const LoginPage = () => {
    const navigate = useNavigate();
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    async function handleSubmit(e: any) {
        e.preventDefault();
        setError("");
        setLoading(true);

        const form = e.currentTarget;
        const email = form.email.value;
        const password = form.password.value;

        if (!email || !password) {
            setError("Please fill in all fields");
            setLoading(false);
            return;
        }

        try {
            const res = await fetch("http://localhost:3001/api/v1/signin", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                credentials: "include",
                body: JSON.stringify({ email, password }),
            });
            const backendData = await res.json();

            if (res.ok) {
                localStorage.setItem("token", backendData.token);
                localStorage.setItem("userId", backendData.userID);
                navigate("/HomePage");
            } else {
                setError("Invalid credentials");
            }
        } catch (err) {
            setError("Connection error. Please try again.");
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="min-h-screen w-full bg-[#030014] flex items-center justify-center relative overflow-hidden font-sans">
            <BackgroundBeams className="opacity-20" />

            <div className="absolute top-[-20%] right-[-20%] w-[50%] h-[50%] bg-purple-500/10 rounded-full blur-[150px]" />

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
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                    className="backdrop-blur-2xl bg-white/[0.02] border border-white/5 rounded-3xl p-8 shadow-2xl overflow-hidden relative"
                >
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-40 h-1 bg-gradient-to-r from-transparent via-blue-500 to-transparent blur-sm" />

                    <div className="mb-10 text-center">
                        <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-tr from-blue-500/20 to-purple-500/20 mb-6 border border-white/5">
                            <Lock className="w-5 h-5 text-blue-400" />
                        </div>
                        <h1 className="text-3xl font-bold font-heading text-white mb-2">Welcome Back</h1>
                        <p className="text-slate-400 text-sm">Access your secure second brain.</p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-5">
                        {error && (
                            <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-3 text-red-400 text-xs text-center">
                                {error}
                            </div>
                        )}

                        <div className="space-y-4">
                            <Input
                                name="email"
                                type="email"
                                placeholder="Email address"
                                className="bg-white/[0.03] border-white/10 h-12 text-white placeholder:text-slate-600 focus:border-blue-500/50 focus:bg-white/[0.05]"
                            />
                            <Input
                                name="password"
                                type="password"
                                placeholder="Password"
                                className="bg-white/[0.03] border-white/10 h-12 text-white placeholder:text-slate-600 focus:border-blue-500/50 focus:bg-white/[0.05]"
                            />
                        </div>

                        <div className="pt-2">
                            <GlowingButton type="submit" className="w-full" disabled={loading}>
                                {loading ? "Authenticating..." : "Secure Sign In"}
                            </GlowingButton>
                        </div>

                        <p className="text-center text-xs text-slate-500 mt-6">
                            New here?{" "}
                            <button type="button" onClick={() => navigate("/register")} className="text-blue-400 hover:text-blue-300 transition-colors">
                                Create account
                            </button>
                        </p>
                    </form>
                </motion.div>
            </div>
        </div>
    );
};

export default LoginPage;
