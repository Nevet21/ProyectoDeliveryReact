import React from "react";
import Sidebar from "../components/Comp_Pag_Prin/SideBar";
import Footer from "../components/Comp_Pag_Prin/Footer";
import Header from "../components/Comp_Pag_Prin/Header";
import SearchBar from "../components/Comp_Pag_Prin/SearchBar"; // Importamos el componente SearchBar

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <Header />

      <div className="flex flex-1">
        {/* Sidebar */}
        <Sidebar />

        {/* Main Content */}
        <main className="flex-1 p-4 bg-gray-50">
          {/* Barra de búsqueda */}
          <div className="mb-4">
            <SearchBar />
          </div>

          {/* Contenido principal */}
          {children}
        </main>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};


export default MainLayout;
