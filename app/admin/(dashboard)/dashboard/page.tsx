import Message from "@/components/dashboard/Message";
import Project from "@/components/dashboard/Project";


export default function Dashboard() {

  return (
    <div className="min-h-screen bg-zinc-950 text-white p-6">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>

      {/* GRID */}
      <div className="grid md:grid-cols-2 gap-6">
        <Message />

        <Project />
      </div>
    </div>
  );
}