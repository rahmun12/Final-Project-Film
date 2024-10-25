import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const DaftarFilm = () => {
  const { id } = useParams();
  const [film, setFilm] = useState([]);
  const [loading, setLoading] = useState(true);

  const apiKey = "7f536bed46f6273d784892dd3a811588"; 
  const filmUrl = `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&with_genres=${id}&language=id`;

  useEffect(() => {
    const fetchFilm = async () => {
      try {
        const response = await axios.get(filmUrl);
        setFilm(response.data.results);
      } catch (error) {
        console.error("Error fetching films:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchFilm();
  }, [id]);

  if (loading) {
    return <div className="text-center text-white">Memuat film...</div>;
  }

  return (
    <div className="daftar-film min-h-screen bg-black text-white flex flex-col items-center py-10">
      <h1 className="text-4xl font-bold mb-6 text-purple-600">Daftar Film</h1>
      <ul className="flex flex-col items-center">
        {film.length > 0 ? (
          film.map((f) => (
            <li key={f.id} className="bg-gray-800 text-purple-600 rounded-lg w-80 p-4 mb-4 transition duration-300 ease-in-out transform hover:scale-105">
              {f.title}
            </li>
          ))
        ) : (
          <li className="text-lg">Tidak ada film untuk kategori ini.</li>
        )}
      </ul>
    </div>
  );
};

export default DaftarFilm;
