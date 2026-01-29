import { motion } from "framer-motion";
import { GlowingButton } from "@/components/ui/glowing-button";
import { BrainSimulation } from "@/components/ui/brain-simulation";
import { useNavigate } from "react-router-dom";
import { ArrowRight, Youtube, Twitter, FileText, Hash, LayoutGrid, CheckCircle, Brain, Share2, Search } from "lucide-react";

const LandingPage = () => {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen w-full bg-[#030014] overflow-x-hidden font-sans selection:bg-purple-500/30 text-white relative">

            {/* Background Gradients */}
            <div className="absolute top-0 left-0 w-full h-[500px] bg-gradient-to-b from-purple-900/20 to-transparent pointer-events-none" />

            {/* Navigation */}
            <nav className="relative z-50 flex items-center justify-between px-6 md:px-12 py-6 border-b border-white/10 backdrop-blur-md">
                <div className="flex items-center gap-3">
                    <BrainSimulation className="w-8 h-8" />
                    <span className="text-xl font-bold font-heading">Second Brain</span>
                </div>

                <div className="flex items-center gap-4">
                    <button
                        onClick={() => navigate("/login")}
                        className="text-sm font-medium text-slate-300 hover:text-white transition-colors"
                    >
                        Login
                    </button>
                    <GlowingButton onClick={() => navigate("/register")} className="bg-purple-600 hover:bg-purple-700">
                        Get Started
                    </GlowingButton>
                </div>
            </nav>

            {/* Hero Section */}
            <section className="relative z-10 pt-20 pb-20 px-6">
                <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
                    <div className="text-left">
                        <h1 className="text-5xl md:text-7xl font-bold font-heading leading-tight mb-6">
                            Your Digital <br />
                            <span className="text-purple-400">Knowledge Base</span>
                        </h1>

                        <p className="text-lg text-slate-400 max-w-xl mb-8 leading-relaxed">
                            Store your YouTube videos, Tweets, Medium articles, and Substack newsletters in one organized place. Stop losing track of great content.
                        </p>

                        <div className="flex items-center gap-4 flex-wrap">
                            <GlowingButton onClick={() => navigate("/register")} className="h-12 px-8 text-base">
                                Get Started Free
                            </GlowingButton>
                            <button onClick={() => navigate("/login")} className="h-12 px-8 rounded-full border border-white/20 text-white font-medium hover:bg-white/5 transition-colors">
                                Login
                            </button>
                        </div>

                        <div className="mt-12 flex gap-6 text-slate-400 text-sm">
                            <div className="flex items-center gap-2">
                                <CheckCircle className="w-4 h-4 text-purple-400" />
                                <span>Free Forever</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <CheckCircle className="w-4 h-4 text-purple-400" />
                                <span>Secure Cloud</span>
                            </div>
                        </div>
                    </div>

                    <div className="relative flex justify-center items-center h-[400px]">
                        {/* 3D Brain Illustration */}
                        <div className="relative w-full max-w-md aspect-square group cursor-pointer">
                            <div className="absolute inset-0 bg-purple-500/20 rounded-full blur-3xl animate-pulse" />
                            <BrainSimulation className="w-full h-full" />

                            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/40 px-3 py-1 rounded-full border border-white/10 opacity-0 group-hover:opacity-100 transition-opacity">
                                <span className="text-xs text-purple-300">Neural Core Active</span>
                            </div>

                            {/* Floating Icons */}
                            <motion.div
                                animate={{ y: [0, -15, 0] }}
                                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                                className="absolute top-10 right-10 p-3 bg-red-600/20 backdrop-blur-md rounded-xl border border-red-500/30 flex items-center gap-3"
                            >
                                <Youtube className="w-6 h-6 text-red-500" />
                                <span className="text-sm font-bold">Saved Videos</span>
                            </motion.div>

                            <motion.div
                                animate={{ y: [0, 15, 0] }}
                                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                                className="absolute bottom-20 left-0 p-3 bg-blue-500/20 backdrop-blur-md rounded-xl border border-blue-500/30 flex items-center gap-3"
                            >
                                <Twitter className="w-6 h-6 text-blue-400" />
                                <span className="text-sm font-bold">Bookmarks</span>
                            </motion.div>
                        </div>
                    </div>
                </div>
            </section>

            {/* How it Works Section - Added Complexity */}
            <section className="py-20 bg-white/[0.02] border-y border-white/5">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-bold font-heading mb-4">How Second Brain Works</h2>
                        <p className="text-slate-400">Three simple steps to clarify your thinking.</p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {[
                            { icon: <Brain className="w-8 h-8 text-purple-400" />, title: "1. Capture", desc: "Save anything you find online instantly via our interface." },
                            { icon: <Search className="w-8 h-8 text-blue-400" />, title: "2. Organize", desc: "Automatically tag and sort your content into intuitive categories." },
                            { icon: <Share2 className="w-8 h-8 text-green-400" />, title: "3. Retrieve", desc: "Find exactly what you need, when you need it, with smart search." }
                        ].map((step, i) => (
                            <div key={i} className="p-8 rounded-2xl bg-white/5 border border-white/5 relative overflow-hidden group">
                                <div className="absolute top-0 right-0 p-4 opacity-10 font-bold text-6xl">{i + 1}</div>
                                <div className="mb-6 bg-white/5 w-16 h-16 rounded-xl flex items-center justify-center border border-white/5 group-hover:scale-110 transition-transform">{step.icon}</div>
                                <h3 className="text-xl font-bold mb-3">{step.title}</h3>
                                <p className="text-slate-400 text-sm leading-relaxed">{step.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Stats Section */}
            <section className="py-20 border-b border-white/5">
                <div className="max-w-4xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                    {[
                        { val: "10k+", label: "Active Users" },
                        { val: "5M+", label: "Links Saved" },
                        { val: "99.9%", label: "Uptime" },
                        { val: "24/7", label: "Support" },
                    ].map((stat, i) => (
                        <div key={i}>
                            <div className="text-4xl font-bold font-heading mb-2 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">{stat.val}</div>
                            <div className="text-sm text-slate-500 uppercase tracking-wider">{stat.label}</div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Supported Platforms */}
            <section className="py-20 bg-white/[0.02]">
                <div className="max-w-7xl mx-auto px-6 text-center">
                    <h2 className="text-2xl font-bold mb-12">Connect your favorite platforms</h2>
                    <div className="flex flex-wrap justify-center gap-10 md:gap-20">
                        <div className="flex flex-col items-center gap-3 text-slate-400 hover:text-red-500 transition-colors">
                            <Youtube className="w-12 h-12" />
                            <span className="font-medium">YouTube</span>
                        </div>
                        <div className="flex flex-col items-center gap-3 text-slate-400 hover:text-blue-400 transition-colors">
                            <Twitter className="w-12 h-12" />
                            <span className="font-medium">Twitter</span>
                        </div>
                        <div className="flex flex-col items-center gap-3 text-slate-400 hover:text-white transition-colors">
                            <FileText className="w-12 h-12" />
                            <span className="font-medium">Medium</span>
                        </div>
                        <div className="flex flex-col items-center gap-3 text-slate-400 hover:text-[#FF6719] transition-colors">
                            <Hash className="w-12 h-12" />
                            <span className="font-medium">Substack</span>
                        </div>
                        <div className="flex flex-col items-center gap-3 text-slate-400 hover:text-purple-400 transition-colors">
                            <LayoutGrid className="w-12 h-12" />
                            <span className="font-medium">More...</span>
                        </div>
                    </div>
                </div>
            </section>

            <footer className="py-8 text-center text-slate-600 text-sm">
                <p>© 2026 Second Brain. All rights reserved.</p>
            </footer>
        </div>
    );
};

export default LandingPage;
