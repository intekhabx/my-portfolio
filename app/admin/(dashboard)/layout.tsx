import DashboardSidebar from "@/components/dashboard/DashboardSidebar";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="flex min-h-screen"
      style={{ background: "#0a0a0a", fontFamily: "var(--font-body)" }}
    >
      <DashboardSidebar />

      <main className="flex-1 overflow-y-auto pt-[52px] md:pt-0" style={{ background: "#0a0a0a" }}>
        {children}
      </main>
    </div>
  );
}