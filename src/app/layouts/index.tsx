"use client";

import SidebarMenu from "@/components/Sidbar";

export default function DashboardLayout({
  children,
  pageTitle
}: {
  children: React.ReactNode;
  pageTitle?: string
}) {
  
  return (
    <div className="flex h-screen">
      {/* Sidebar Esquerdo */}
      <SidebarMenu />

      {/* Corpo Principal */}
      <div className="flex-1 flex flex-col">
        <header className="p-4 bg-gray-200 shadow-md">
        <h1 className="text-2xl">{pageTitle || "Dashboard"}</h1>
        </header>
        <main className="flex-1 p-4 overflow-auto">{children}</main>
        <footer className="p-4 bg-gray-200 text-center shadow-md">
        <p>&copy; {new Date().getFullYear()} Lemos Soluções em Tecnologia. Todos os direitos reservados.</p>
        </footer>
      </div>
      
    </div>
    
  );
}