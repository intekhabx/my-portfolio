import DashboardSidebar from "@/components/dashboard/DashboardSidebar";

export default function AdminLayout({children,}: {children: React.ReactNode}) {
  return (
    <div
      className="flex min-h-screen"
      style={{
        background: "#0a0a0a",
        fontFamily: "var(--font-body)",
      }}
    >
      {/* Fixed sidebar */}
      <DashboardSidebar />

      {/* Main content area */}
      <main className="flex-1 overflow-y-auto" style={{ background: "#0a0a0a" }}>
        {children}
      </main>
    </div>
  );
}