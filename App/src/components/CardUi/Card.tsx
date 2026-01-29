import { Trash2, ExternalLink, Youtube, Twitter, FileText, Hash, Link as LinkIcon } from "lucide-react";
import { motion } from "framer-motion";

interface CardProps {
  title: string;
  link: string;
  type: "youtube" | "twitter" | "medium" | "substack" | "link";
  tags?: string[];
  date: string;
  onDelete: () => void;
}

export const Card = ({ title, link, type, tags, date, onDelete }: CardProps) => {

  const getIcon = () => {
    switch (type) {
      case "youtube": return <Youtube className="w-5 h-5 text-red-500" />;
      case "twitter": return <Twitter className="w-5 h-5 text-blue-400" />;
      case "medium": return <FileText className="w-5 h-5 text-white" />;
      case "substack": return <Hash className="w-5 h-5 text-[#FF6719]" />;
      default: return <LinkIcon className="w-5 h-5 text-slate-400" />;
    }
  }

  const getTypeLabel = () => {
    return type.charAt(0).toUpperCase() + type.slice(1);
  }

  const getYouTubeId = (url: string) => {
    if (!url) return null;
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
  };

  const youtubeId = type === "youtube" ? getYouTubeId(link) : null;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2 }}
      className="group relative bg-white/[0.03] backdrop-blur-md border border-white/5 rounded-2xl overflow-hidden hover:border-purple-500/30 hover:bg-white/[0.05] transition-all"
    >
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-purple-500/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

      <div className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center border border-white/5">
              {getIcon()}
            </div>
            <span className="text-xs font-medium text-slate-500 uppercase tracking-wider">{getTypeLabel()}</span>
          </div>
          <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
            <button onClick={() => window.open(link, '_blank')} className="p-1.5 rounded-lg hover:bg-white/10 text-slate-400 hover:text-white transition-colors">
              <ExternalLink className="w-4 h-4" />
            </button>
            <button onClick={onDelete} className="p-1.5 rounded-lg hover:bg-red-500/10 text-slate-400 hover:text-red-400 transition-colors">
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        </div>

        <h3 className="text-lg font-bold text-white mb-2 line-clamp-2 leading-tight min-h-[3.5rem]">
          {title}
        </h3>

        {type === "youtube" && youtubeId && (
          <div className="rounded-xl overflow-hidden border border-white/5 mb-4 aspect-video relative group/media cursor-pointer" onClick={() => window.open(link, '_blank')}>
            <div className="absolute inset-0 bg-black/50 flex items-center justify-center group-hover/media:bg-black/30 transition-colors z-10">
              <div className="w-10 h-10 rounded-full bg-white/10 backdrop-blur border border-white/20 flex items-center justify-center transition-transform group-hover/media:scale-110">
                <div className="w-0 h-0 border-t-[6px] border-t-transparent border-l-[10px] border-l-white border-b-[6px] border-b-transparent ml-1" />
              </div>
            </div>
            <img
              src={`https://img.youtube.com/vi/${youtubeId}/mqdefault.jpg`}
              alt="Thumbnail"
              className="w-full h-full object-cover transform group-hover/media:scale-105 transition-transform duration-500 bg-slate-800"
              onError={(e) => {
                (e.target as HTMLImageElement).style.display = 'none';
              }}
            />
          </div>
        )}

        {type === "twitter" && (
          <div className="p-3 rounded-xl bg-blue-500/5 border border-blue-500/10 mb-4 transition-colors hover:bg-blue-500/10 cursor-pointer" onClick={() => window.open(link, '_blank')}>
            <Twitter className="w-4 h-4 text-blue-400 mb-2" />
            <p className="text-xs text-blue-200/70 italic truncate">{link}</p>
          </div>
        )}

        <div className="flex items-center justify-between pt-4 border-t border-white/5 mt-auto">
          <div className="flex gap-2 flex-wrap">
            {tags?.map((tag, i) => (
              <span key={i} className="text-[10px] px-2 py-1 rounded-md bg-white/5 text-slate-300 border border-white/5">#{tag}</span>
            ))}
          </div>
          <span className="text-[10px] text-slate-600 font-medium">
            {new Date(date).toLocaleDateString()}
          </span>
        </div>
      </div>
    </motion.div>
  );
};