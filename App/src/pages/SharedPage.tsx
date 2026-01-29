import { useLocation, useParams } from "react-router-dom";
import { Card } from "../components/CardUi/Card";
import { useEffect, useState } from "react";
import { BrainSimulation } from "@/components/ui/brain-simulation";

const SharedPage = () => {
  const { id } = useParams(); // This is the userId
  const [sharedData, setSharedData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSharedContent = async () => {
      if (!id) return;
      try {
        const response = await fetch(`http://localhost:3001/api/v1/share/${id}`);
        const json = await response.json();
        if (json.data) {
          setSharedData(json.data);
        }
      } catch (e) {
        console.error("Error fetching shared content", e);
      } finally {
        setLoading(false);
      }
    };

    fetchSharedContent();
  }, [id]);

  return (
    <div className="bg-[#030014] w-full min-h-screen text-white font-sans selection:bg-purple-500/30">

      {/* Header */}
      <div className="px-8 py-6 border-b border-white/10 flex items-center gap-4 bg-white/[0.02]">
        <BrainSimulation className="w-8 h-8" />
        <h1 className="text-2xl font-bold font-heading">Shared Brain</h1>
      </div>

      <div className="p-8">
        {loading ? (
          <div className="flex justify-center py-20">
            <div className="w-8 h-8 border-2 border-purple-500 border-t-transparent rounded-full animate-spin" />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {sharedData.length > 0 ? (
              sharedData.map((item: any, idx: number) => (
                <Card
                  key={idx}
                  type={item.contentType || "link"}
                  tags={[item.tag]}
                  title={item.title}
                  link={item.link}
                  date={item.date || new Date().toISOString()}
                  onDelete={() => { }} // Read-only view
                />
              ))
            ) : (
              <div className="col-span-full text-center py-20 text-slate-500">
                <p className="text-xl">No shared content found.</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default SharedPage;