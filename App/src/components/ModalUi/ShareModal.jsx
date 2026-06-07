import { useRef, useState } from "react";
import { X, Copy, Check, Twitter, Linkedin, MessageCircle } from "lucide-react";
import { GlowingButton } from "@/components/ui/glowing-button";
import { Input } from "@/components/ui/input";
import { motion } from "framer-motion";

const ShareModal = ({ shareLink, setModal }) => {
    const [copied, setCopied] = useState(false);
    const linkRef = useRef(null);

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(shareLink);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (err) {
            console.error("Failed to copy text: ", err);
        }
    };

    const handleShareTwitter = () => {
        const text = encodeURIComponent("Check out my Second Brain Vault! 🧠✨");
        window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(shareLink)}&text=${text}`, '_blank');
    };

    const handleShareLinkedIn = () => {
        window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareLink)}`, '_blank');
    };

    const handleShareWhatsApp = () => {
        const text = encodeURIComponent(`Check out my Second Brain Vault! 🧠✨ ${shareLink}`);
        window.open(`https://wa.me/?text=${text}`, '_blank');
    };

    return (
        <div className="fixed inset-0 h-screen w-full flex justify-center items-center z-50 px-4">
            <motion.div 
                initial={{ opacity: 0 }} 
                animate={{ opacity: 1 }} 
                exit={{ opacity: 0 }} 
                onClick={() => setModal(false)} 
                className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            />

            <motion.div 
                initial={{ opacity: 0, scale: 0.9, y: 20 }} 
                animate={{ opacity: 1, scale: 1, y: 0 }} 
                exit={{ opacity: 0, scale: 0.9, y: 20 }} 
                className="relative z-10 w-full max-w-md bg-[#0a0a0a] border border-white/10 rounded-2xl shadow-2xl overflow-hidden"
            >
                {/* Header */}
                <div className="flex items-center justify-between px-6 py-4 border-b border-white/5 bg-white/[0.02]">
                    <h2 className="text-xl font-bold font-heading text-white">Share Your Brain</h2>
                    <button onClick={() => setModal(false)} className="p-1 rounded-full hover:bg-white/10 text-slate-400 hover:text-white transition-colors">
                        <X className="w-5 h-5" />
                    </button>
                </div>

                <div className="p-6 space-y-6">
                    {/* Visual Preview */}
                    <div className="w-full h-32 rounded-xl bg-gradient-to-tr from-purple-500/20 to-blue-500/20 border border-white/10 flex items-center justify-center relative overflow-hidden">
                         <div className="absolute top-[-20%] left-[-20%] w-[50%] h-[50%] bg-purple-500/30 rounded-full blur-[40px]"/>
                         <div className="absolute bottom-[-20%] right-[-20%] w-[50%] h-[50%] bg-blue-500/30 rounded-full blur-[40px]"/>
                         <h3 className="text-white font-bold text-2xl relative z-10 font-heading">🧠 My Vault</h3>
                    </div>

                    <div className="space-y-2">
                        <label className="text-xs font-medium text-slate-400 block uppercase tracking-wider">Share Link</label>
                        <div className="flex gap-2">
                            <Input 
                                ref={linkRef} 
                                value={shareLink} 
                                readOnly 
                                className="bg-white/[0.03] border-white/10 text-slate-300 flex-1"
                            />
                            <button 
                                onClick={handleCopy}
                                className={`flex items-center justify-center w-12 h-12 rounded-xl border transition-all ${
                                    copied ? "bg-green-500/10 border-green-500/50 text-green-400" : "bg-white/[0.03] border-white/10 text-slate-400 hover:bg-white/[0.05] hover:text-white"
                                }`}
                            >
                                {copied ? <Check className="w-5 h-5" /> : <Copy className="w-5 h-5" />}
                            </button>
                        </div>
                    </div>

                    <div className="pt-2 border-t border-white/5">
                        <label className="text-xs font-medium text-slate-400 mb-3 block uppercase tracking-wider">Quick Share</label>
                        <div className="flex gap-3">
                            <button onClick={handleShareTwitter} className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl bg-[#1DA1F2]/10 hover:bg-[#1DA1F2]/20 border border-[#1DA1F2]/20 text-[#1DA1F2] transition-colors">
                                <Twitter className="w-4 h-4" />
                            </button>
                            <button onClick={handleShareLinkedIn} className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl bg-[#0077b5]/10 hover:bg-[#0077b5]/20 border border-[#0077b5]/20 text-[#0077b5] transition-colors">
                                <Linkedin className="w-4 h-4" />
                            </button>
                            <button onClick={handleShareWhatsApp} className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl bg-[#25D366]/10 hover:bg-[#25D366]/20 border border-[#25D366]/20 text-[#25D366] transition-colors">
                                <MessageCircle className="w-4 h-4" />
                            </button>
                        </div>
                    </div>
                    
                    <div className="pt-2">
                         <GlowingButton onClick={() => setModal(false)} className="w-full">
                            Done
                         </GlowingButton>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export default ShareModal;
