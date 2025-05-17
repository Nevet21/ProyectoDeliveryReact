import React from "react";
import Sidebar from "../components/Comp_Pag_Prin/SideBar";
import Footer from "../components/Comp_Pag_Prin/Footer";
import Header from "../components/Comp_Pag_Prin/Header";
import SearchBar from "../components/Comp_Pag_Prin/SearchBar";

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  return (
    <div className="flex flex-col h-screen">
      {/* Header */}
      <Header />

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <Sidebar />

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto p-4 bg-gray-50">
          {/* Barra de búsqueda */}
          <div className="mb-4">
            <SearchBar />
          </div>

          {/* Contenido principal */}
          {children}
        </main>
      </div>
    </div>
  );
};

export default MainLayout;
