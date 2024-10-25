import { useState } from "react";
import { useHistory } from "react-router-dom";

const Search = () => {
  const [query, setQuery] = useState("");
  const history = useHistory(); 

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim()) {
      history.push(`/search?query=${encodeURIComponent(query)}`);
      setQuery(""); 
    }
  };

  return (
    <form onSubmit={handleSearch} className="flex justify-center">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Cari film..."
        className="px-4 py-2 rounded-l-lg focus:outline-none"
        style={{ fontFamily: "'Times New Roman', Times, serif" }}
      />
      <button
        type="submit"
        className="bg-purple-600 hover:bg-purple-500 text-white font-medium px-4 py-2 rounded-r-lg transition duration-300"
      >
        Cari
      </button>
    </form>
  );
};

export default Search;
