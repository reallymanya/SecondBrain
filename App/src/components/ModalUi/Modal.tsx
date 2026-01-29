import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { X, Youtube, Twitter, FileText, Hash, Link as LinkIcon, Check } from "lucide-react";
import { GlowingButton } from "@/components/ui/glowing-button";
import { Input } from "@/components/ui/input";
import { motion, AnimatePresence } from "framer-motion";

const Modal = (props: { onClick: () => void, setModal: (value: boolean) => void, setReloadData: () => void }) => {
  const navigate = useNavigate();
  const modalRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLInputElement>(null);
  const linkRef = useRef<HTMLInputElement>(null);
  const [tag, setTag] = useState("Productivity");
  const [category, setCategory] = useState("youtube");
  const [loading, setLoading] = useState(false);

  const mapTags = ["Productivity", "Tech & Tools", "Mindset", "Learning & Skills", "Workflows", "Inspiration"] as const;

  const categories = [
    { id: "youtube", label: "YouTube", icon: <Youtube className="w-4 h-4" /> },
    { id: "twitter", label: "Twitter", icon: <Twitter className="w-4 h-4" /> },
    { id: "medium", label: "Medium", icon: <FileText className="w-4 h-4" /> },
    { id: "substack", label: "Substack", icon: <Hash className="w-4 h-4" /> },
    { id: "link", label: "Other", icon: <LinkIcon className="w-4 h-4" /> }
  ];

  const submitData = async () => {
    if (
      linkRef.current?.value.trim() === "" ||
      titleRef.current?.value.trim() === ""
    ) {
      return;
    }

    setLoading(true);

    const data = {
      link: linkRef.current?.value || "",
      contentType: category.toLowerCase(),
      title: titleRef.current?.value || "",
      tag,
    };

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/login");
        return;
      }

      await fetch("http://localhost:3001/api/v1/addcontent", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "token": token
        },
        credentials: "include",
        body: JSON.stringify(data)
      });

      props.setReloadData();
      props.setModal(false);
    } catch (err) {
      console.log("Error while sending data");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 h-screen w-full flex justify-center items-center z-50 px-4">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        ref={modalRef}
        onClick={props.onClick}
        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
      />

      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 20 }}
        className="relative z-10 w-full max-w-lg bg-[#0a0a0a] border border-white/10 rounded-2xl shadow-2xl overflow-hidden"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/5 bg-white/[0.02]">
          <h2 className="text-xl font-bold font-heading text-white">Add New Content</h2>
          <button
            onClick={props.onClick}
            className="p-1 rounded-full hover:bg-white/10 text-slate-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          <div className="space-y-4">
            <div>
              <label className="text-xs font-medium text-slate-400 mb-1.5 block uppercase tracking-wider">Title</label>
              <Input
                ref={titleRef}
                placeholder="e.g. The Future of AI"
                maxLength={50}
                className="bg-white/[0.03] border-white/10"
              />
            </div>

            <div>
              <label className="text-xs font-medium text-slate-400 mb-1.5 block uppercase tracking-wider">URL</label>
              <Input
                ref={linkRef}
                placeholder="https://..."
                className="bg-white/[0.03] border-white/10"
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-medium text-slate-400 mb-3 block uppercase tracking-wider">Category</label>
            <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setCategory(cat.id)}
                  className={`flex flex-col items-center justify-center p-2 rounded-xl border transition-all ${category === cat.id
                      ? "bg-purple-500/10 border-purple-500/50 text-purple-400"
                      : "bg-white/[0.03] border-white/5 text-slate-400 hover:bg-white/[0.05] hover:text-white"
                    }`}
                >
                  <div className="mb-1">{cat.icon}</div>
                  <span className="text-[10px] font-medium">{cat.label}</span>
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="text-xs font-medium text-slate-400 mb-3 block uppercase tracking-wider">Tags</label>
            <div className="flex flex-wrap gap-2">
              {mapTags.map((t) => (
                <button
                  key={t}
                  onClick={() => setTag(t)}
                  className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-all flex items-center gap-1.5 ${tag === t
                      ? "bg-blue-500/10 border-blue-500/50 text-blue-400"
                      : "bg-white/[0.03] border-white/5 text-slate-400 hover:bg-white/[0.05] hover:text-white"
                    }`}
                >
                  {tag === t && <Check className="w-3 h-3" />}
                  {t}
                </button>
              ))}
            </div>
          </div>

          <div className="pt-2">
            <GlowingButton onClick={submitData} className="w-full" disabled={loading}>
              {loading ? "Adding to Brain..." : "Add Content"}
            </GlowingButton>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Modal;