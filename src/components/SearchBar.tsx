import React, { useState } from "react";

const SearchBar: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const handleSearchSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    // Aquí puedes agregar la lógica de búsqueda
    console.log("Buscando:", searchQuery);
  };

  return (
    <form onSubmit={handleSearchSubmit} className="flex items-center p-2 border rounded-md">
      <input
        type="text"
        value={searchQuery}
        onChange={handleSearchChange}
        placeholder="Restaurantes, comidas..."
        className="p-2 flex-grow border-none outline-none"
      />
      <button type="submit" className="text-xl text-blue-500 ml-2 cursor-pointer">
        🔍
      </button>
    </form>
  );
};

export default SearchBar;
