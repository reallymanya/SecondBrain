import { Trash2, Pencil, ExternalLink, Youtube, Twitter, FileText, Hash, Link as LinkIcon } from "lucide-react";
import { motion } from "framer-motion";
import { Tweet } from "react-tweet";
import { useState, useEffect } from "react";

export const Card = ({ title, link, type, tags, date, onDelete, onEdit }) => {
    const getIcon = () => {
        switch (type) {
            case "youtube": return <Youtube className="w-5 h-5 text-red-500" />;
            case "twitter": return <Twitter className="w-5 h-5 text-blue-400" />;
            case "medium": return <FileText className="w-5 h-5 text-white" />;
            case "substack": return <Hash className="w-5 h-5 text-[#FF6719]" />;
            default: return <LinkIcon className="w-5 h-5 text-slate-400" />;
        }
    };

    const getTypeLabel = () => {
        return type.charAt(0).toUpperCase() + type.slice(1);
    };

    const getYouTubeId = (url) => {
        if (!url) return null;
        const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
        const match = url.match(regExp);
        return (match && match[2].length === 11) ? match[2] : null;
    };

    const getTweetId = (url) => {
        if (!url) return null;
        const regExp = /(?:twitter\.com|x\.com)\/(?:#!\/)?(\w+)\/status(?:es)?\/(\d+)/;
        const match = url.match(regExp);
        return match ? match[2] : null;
    };

    const youtubeId = type === "youtube" ? getYouTubeId(link) : null;
    const tweetId = type === "twitter" ? getTweetId(link) : null;

    const [previewImage, setPreviewImage] = useState(null);

    useEffect(() => {
        if (type !== "youtube" && type !== "twitter" && link) {
            const fetchPreview = async () => {
                try {
                    const res = await fetch(`https://api.microlink.io?url=${encodeURIComponent(link)}`);
                    const json = await res.json();
                    if (json.status === "success" && json.data?.image?.url) {
                        setPreviewImage(json.data.image.url);
                    }
                } catch (e) {
                    console.error("Error fetching preview", e);
                }
            };
            fetchPreview();
        }
    }, [link, type]);

    return (
        <motion.div
            layout
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            whileHover={{ y: -4 }}
            transition={{ duration: 0.2 }}
            className="group relative flex flex-col gap-3 w-full bg-white/[0.03] backdrop-blur-md border border-white/5 rounded-2xl p-3 overflow-hidden hover:border-purple-500/30 hover:bg-white/[0.05] transition-all"
        >
            {/* THUMBNAIL AREA (16:9) */}
            <div className="relative w-full aspect-video rounded-xl overflow-hidden bg-black/20 border border-white/5 group/thumb">
                
                {/* Media Content */}
                {type === "youtube" && youtubeId ? (
                    <img 
                        src={`https://img.youtube.com/vi/${youtubeId}/maxresdefault.jpg`} 
                        onError={(e) => { e.target.src = `https://img.youtube.com/vi/${youtubeId}/hqdefault.jpg`; }}
                        alt="Thumbnail" 
                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 group-hover/thumb:scale-105"
                    />
                ) : type === "twitter" && tweetId ? (
                    <div className="absolute inset-0 w-full h-full bg-[#000000] flex items-center justify-center overflow-hidden pointer-events-none">
                        <div className="absolute inset-0 z-10" />
                        <div className="w-[200%] flex justify-center items-center origin-center" style={{ transform: 'scale(0.50)' }}>
                            <Tweet id={tweetId} />
                        </div>
                    </div>
                ) : previewImage ? (
                    <img 
                        src={previewImage} 
                        alt="Preview" 
                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 group-hover/thumb:scale-105"
                    />
                ) : (
                    <div className="absolute inset-0 w-full h-full bg-gradient-to-br from-white/5 to-white/10 flex items-center justify-center">
                        {getIcon()}
                    </div>
                )}

                {/* Hover Actions Overlay */}
                <div className="absolute top-2 right-2 flex gap-2 opacity-0 group-hover/thumb:opacity-100 transition-opacity z-20">
                    <button 
                        onClick={() => window.open(link, '_blank')} 
                        className="p-2 rounded-lg bg-black/60 backdrop-blur-md text-white hover:bg-black/80 transition-colors"
                        title="Open Link"
                    >
                        <ExternalLink className="w-4 h-4" />
                    </button>
                    <button 
                        onClick={onEdit} 
                        className="p-2 rounded-lg bg-black/60 backdrop-blur-md text-white hover:bg-blue-500/80 transition-colors"
                        title="Edit Content"
                    >
                        <Pencil className="w-4 h-4" />
                    </button>
                    <button 
                        onClick={onDelete} 
                        className="p-2 rounded-lg bg-black/60 backdrop-blur-md text-white hover:bg-red-500/80 transition-colors"
                        title="Delete Content"
                    >
                        <Trash2 className="w-4 h-4" />
                    </button>
                </div>

                {/* Optional Type Badge on Thumbnail (like YouTube duration) */}
                <div className="absolute bottom-2 right-2 px-1.5 py-0.5 rounded bg-black/80 text-[10px] font-medium text-white tracking-wide">
                    {getTypeLabel().toUpperCase()}
                </div>
            </div>

            {/* METADATA AREA (YouTube Style) */}
            <div className="flex gap-3 px-1 cursor-pointer" onClick={() => window.open(link, '_blank')}>
                
                {/* Circular "Profile Picture" */}
                <div className="flex-shrink-0 mt-0.5">
                    <div className="w-9 h-9 rounded-full bg-white/5 flex items-center justify-center border border-white/10 text-white">
                        {getIcon()}
                    </div>
                </div>

                {/* Title & Details */}
                <div className="flex flex-col overflow-hidden w-full">
                    <h3 className="text-[15px] font-semibold text-white line-clamp-2 leading-snug mb-1 group-hover:text-purple-400 transition-colors">
                        {title}
                    </h3>
                    
                    <div className="text-[13px] text-slate-400 flex flex-col gap-0.5">
                        <div className="flex items-center gap-1.5">
                            <span>{getTypeLabel()}</span>
                            <span className="text-[10px]">•</span>
                            <span>{new Date(date).toLocaleDateString()}</span>
                        </div>
                        
                        {tags && tags.length > 0 && (
                            <div className="flex gap-1.5 mt-0.5 overflow-hidden">
                                {tags.map((tag, i) => (
                                    <span key={i} className="truncate">#{tag}</span>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </motion.div>
    );
};
