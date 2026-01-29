"use client";
import { Twitter, Youtube, FileText, Hash, LayoutGrid, LogOut, Plus, Share2, Link as LinkIcon } from "lucide-react";
import { GlowingButton } from "./glowing-button";
import { useNavigate } from "react-router-dom";
import { BrainSimulation } from "./brain-simulation";

export const Sidebar = ({
    activeTab,
    setActiveTab,
    onAddContent,
    onShare
}: {
    activeTab: string;
    setActiveTab: (tab: string) => void;
    onAddContent: () => void;
    onShare: () => void;
}) => {
    const navigate = useNavigate();

    const menuItems = [
        { id: "all", label: "All Notes", icon: <LayoutGrid className="w-5 h-5" /> },
        { id: "youtube", label: "YouTube", icon: <Youtube className="w-5 h-5" /> },
        { id: "twitter", label: "Twitter", icon: <Twitter className="w-5 h-5" /> },
        { id: "medium", label: "Medium", icon: <FileText className="w-5 h-5" /> },
        { id: "substack", label: "Substack", icon: <Hash className="w-5 h-5" /> },
        { id: "link", label: "Others", icon: <LinkIcon className="w-5 h-5" /> },
    ];

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("userId");
        navigate("/login");
    }

    return (
        <div className="w-72 h-screen bg-[#050505] border-r border-white/5 flex flex-col p-6 fixed left-0 top-0 z-20">
            <div className="flex items-center gap-3 px-2 mb-10 group cursor-pointer" onClick={() => navigate("/")}>
                <div className="relative">
                    <div className="absolute inset-0 bg-purple-500/20 blur-md rounded-full" />
                    <BrainSimulation className="w-8 h-8 relative z-10" />
                </div>
                <span className="text-xl font-bold font-heading text-white tracking-tight">Second Brain</span>
            </div>

            <div className="space-y-2 flex-1">
                {menuItems.map((item) => (
                    <button
                        key={item.id}
                        onClick={() => setActiveTab(item.id)}
                        className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 group ${activeTab === item.id
                            ? "bg-purple-600/10 text-purple-400 border border-purple-500/20"
                            : "text-slate-400 hover:text-white hover:bg-white/5"
                            }`}
                    >
                        <span className={`${activeTab === item.id ? "text-purple-400" : "text-slate-500 group-hover:text-white"}`}>
                            {item.icon}
                        </span>
                        <span className="font-medium">{item.label}</span>
                        {activeTab === item.id && (
                            <span className="ml-auto w-1.5 h-1.5 rounded-full bg-purple-400 shadow-[0_0_8px_rgba(168,85,247,0.5)]"></span>
                        )}
                    </button>
                ))}
            </div>

            <div className="pt-6 border-t border-white/5 space-y-4">
                <div className="flex gap-2">
                    <GlowingButton onClick={onAddContent} className="flex-1 text-sm h-10 px-0">
                        <span className="flex items-center gap-2 justify-center">
                            <Plus className="w-4 h-4" /> Add
                        </span>
                    </GlowingButton>
                    <button
                        onClick={onShare}
                        className="h-10 px-4 rounded-xl bg-purple-500/10 border border-purple-500/20 text-purple-400 hover:bg-purple-500/20 transition-colors"
                        title="Share Brain"
                    >
                        <Share2 className="w-4 h-4" />
                    </button>
                </div>

                <button
                    onClick={handleLogout}
                    className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-slate-500 hover:text-red-400 hover:bg-red-500/5 transition-colors"
                >
                    <LogOut className="w-5 h-5" />
                    <span className="font-medium">Sign Out</span>
                </button>
            </div>
        </div>
    );
};
