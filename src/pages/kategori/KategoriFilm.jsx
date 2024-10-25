import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const KategoriFilm = () => {
  const [kategori, setKategori] = useState([]);
  const [loading, setLoading] = useState(true);
  const isDarkMode = useSelector((state) => state.theme.isDarkMode);

  const apiKey = "7f536bed46f6273d784892dd3a811588"; 
  const kategoriUrl = `https://api.themoviedb.org/3/genre/movie/list?api_key=${apiKey}&language=id`;

  useEffect(() => {
    const fetchKategori = async () => {
      try {
        const response = await axios.get(kategoriUrl);
        setKategori(response.data.genres);
      } catch (error) {
        console.error("Error fetching categories:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchKategori();
  }, []);

  if (loading) {
    return <div className="text-center text-white">Memuat kategori...</div>;
  }

  return (
    <div className={`kategori-film min-h-screen ${isDarkMode ? "from-purple-900 to-black" : "from-purple-300 to-gray-500"} bg-gradient-to-r transition-all duration-1000 text-white flex flex-col items-center justify-center`}>
      <h1 className="text-5xl font-bold mb-6 text-purple-300" style={{ fontFamily: "'Times New Roman', Times, serif" }}>
        Pilih Kategori Film
      </h1>
      <div className="flex flex-wrap justify-center mb-10">
        {kategori.map((kat) => (
          <Link
            key={kat.id}
            to={`/film/${kat.id}`}
            className="text-xl mx-4 my-2 bg-purple-600 hover:bg-purple-500 text-white font-medium rounded-lg px-4 py-2 transition duration-300 transform hover:scale-105"
            style={{ fontFamily: "'Times New Roman', Times, serif" }}
          >
            {kat.name}
          </Link>
        ))}
      </div>
      <footer className="mt-10 text-gray-400 text-sm">
        &copy; 2024 RKMovie. All rights reserved.
      </footer>
    </div>
  );
};

export default KategoriFilm;


