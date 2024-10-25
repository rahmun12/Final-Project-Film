import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom"; // Impor Link untuk navigasi

const HasilPencarian = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const query = new URLSearchParams(useLocation().search).get("query");
  const isDarkMode = useSelector((state) => state.theme.isDarkMode);

  const apiKey = "7f536bed46f6273d784892dd3a811588"; 
  const searchUrl = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&language=id&query=${query}`;

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await axios.get(searchUrl);
        setMovies(response.data.results);
      } catch (error) {
        console.error("Error fetching search results:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, [query]);

  if (loading) {
    return (
      <div className="text-center text-white">Memuat hasil pencarian...</div>
    );
  }

  return (
    <div
      className={`grid grid-cols-1 gap-6 p-6 ${isDarkMode ? "bg-gray-900" : "bg-slate-500"} text-white transition-all duration-1000 min-h-screen`}
    >
      <h1 className="text-4xl font-bold mb-8 text-purple-400 text-center">
        Hasil Pencarian: {query}
      </h1>
      <div className="flex flex-col items-center w-full">
        {movies.length > 0 ? (
          movies.map((movie) => (
            <div key={movie.id} className="m-4 p-6 bg-gray-800 rounded-lg shadow-lg flex flex-row items-center w-full max-w-4xl transition-transform duration-300 hover:scale-105 hover:shadow-2xl">
              {/* Gambar film sebagai tautan */}
              <Link to={`/detail/${movie.id}`} className="w-1/3">
                {movie.poster_path ? (
                  <img
                    src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                    alt={movie.title}
                    className="w-full h-auto rounded-lg"
                  />
                ) : (
                  <div className="w-full h-full bg-gray-700 rounded-lg flex items-center justify-center">
                    <span className="text-gray-400">No Image</span>
                  </div>
                )}
              </Link>

              {/* Konten teks film */}
              <div className="ml-6 flex flex-col justify-center w-2/3">
                <h2 className="text-2xl font-semibold text-purple-300 mb-2">
                  {movie.title}
                </h2>
                <p className="text-gray-400">{movie.release_date}</p>
                <p className="text-gray-300 mt-4">{movie.overview}</p>
              </div>
            </div>
          ))
        ) : (
          <p className="text-lg">Tidak ada hasil untuk pencarian ini.</p>
        )}
      </div>
    </div>
  );
};

export default HasilPencarian;
