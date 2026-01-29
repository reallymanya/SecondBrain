import { useEffect, useState } from "react";
import { Sidebar } from "@/components/ui/sidebar";
import { Card } from "@/components/CardUi/Card";
import Modal from "@/components/ModalUi/Modal";
import { AnimatePresence } from "framer-motion";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";

const HomePage = () => {
  const [modal, setModal] = useState(false);
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [activeTab, setActiveTab] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const fetchData = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;

      const response = await fetch("http://localhost:3001/api/v1/content", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "token": token
        },
      });
      const json = await response.json();
      if (json.data) {
        setData(json.data);
        setFilteredData(json.data);
      }
    } catch (e) {
      console.error("Error fetching data", e);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    let result = data;

    // Filter by Tab
    if (activeTab !== "all") {
      result = result.filter((item: any) => (item.contentType || item.type) === activeTab);
    }

    // Filter by Search
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter((item: any) =>
        item.title.toLowerCase().includes(query) ||
        item.tags?.some((tag: string) => tag.toLowerCase().includes(query))
      );
    }

    setFilteredData(result);
  }, [activeTab, searchQuery, data]);

  const deleteContent = async (contentId: string) => {
    try {
      const token = localStorage.getItem("token");
      await fetch("http://localhost:3001/api/v1/delete", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "token": token || ""
        },
        body: JSON.stringify({ contentId })
      });
      fetchData();
    } catch (e) {
      console.error("Error deleting content", e);
    }
  };

  const shareBrain = async () => {
    const userId = localStorage.getItem("userId");
    if (userId) {
      const shareLink = `http://localhost:5173/share/${userId}`;
      await navigator.clipboard.writeText(shareLink);
      alert("Share link copied to clipboard: " + shareLink);
    } else {
      alert("Please log in to share your brain");
    }
  };

  return (
    <div className="flex min-h-screen bg-[#030014] font-sans selection:bg-purple-500/30">
      {/* Sidebar */}
      <Sidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onAddContent={() => setModal(true)}
        onShare={shareBrain}
      />

      {/* Main Content */}
      <main className="flex-1 ml-72 p-8">
        {/* Header */}
        <header className="flex items-center justify-between mb-10">
          <div>
            <h1 className="text-3xl font-bold font-heading text-white mb-2">My Vault</h1>
            <p className="text-slate-400 text-sm">Welcome back, here's your second brain.</p>
          </div>

          <div className="relative w-96">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
            <Input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by title or tag..."
              className="pl-10 bg-white/[0.03] border-white/5"
            />
          </div>
        </header>

        {/* Content Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          <AnimatePresence mode="popLayout">
            {filteredData.map((item: any) => (
              <Card
                key={item._id}
                title={item.title}
                link={item.link}
                type={item.type || item.contentType || "link"}
                tags={item.tags}
                date={item.date || new Date().toISOString()} // Fallback date if needed
                onDelete={() => deleteContent(item._id)}
              />
            ))}
          </AnimatePresence>
        </div>

        {filteredData.length === 0 && (
          <div className="text-center py-20">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-white/5 border border-white/5 mb-4">
              <Search className="w-8 h-8 text-slate-600" />
            </div>
            <h3 className="text-lg font-medium text-slate-300">No content found</h3>
            <p className="text-slate-500 text-sm">Try adjusting your filters or add new content.</p>
          </div>
        )}
      </main>

      <AnimatePresence>
        {modal && (
          <Modal
            setModal={setModal}
            onClick={() => setModal(false)}
            setReloadData={fetchData}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default HomePage;