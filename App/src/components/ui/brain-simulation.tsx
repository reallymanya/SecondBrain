"use client";
import { motion } from "framer-motion";

export const BrainSimulation = ({ className }: { className?: string }) => {
    return (
        <div className={`relative flex items-center justify-center ${className}`}>
            {/* Core Brain Glow */}
            <div className="absolute inset-0 bg-purple-500/20 rounded-full blur-xl animate-pulse" />

            {/* Simpler, Elegant Rings - Reverted to previous style but refined */}
            <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0 border border-purple-500/40 rounded-full w-full h-full border-t-transparent border-l-transparent"
            />
            <motion.div
                animate={{ rotate: -360 }}
                transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                className="absolute inset-1 border border-blue-500/40 rounded-full w-[calc(100%-8px)] h-[calc(100%-8px)] border-b-transparent border-r-transparent"
            />

            {/* Central Core - Replacing "white circle" with gradient node */}
            <div className="relative z-10 w-1/2 h-1/2 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full shadow-[0_0_15px_rgba(139,92,246,0.5)] animate-pulse" />
        </div>
    );
};
