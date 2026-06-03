export default function AdminLayout({children}: {children: React.ReactNode}) {
  return (
    <div>
      <main>{children}</main>
    </div>
  );
}