import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import axios from "axios";

const RatedMovies = () => {
  const [ratedMovies, setRatedMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null); // Menyimpan pesan error
  const isDarkMode = useSelector((state) => state.theme.isDarkMode);

  const API_URL = "https://api.themoviedb.org/3/account/21559552/rated/movies"; // Pastikan URL API benar
  const bearerToken = "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwNGJlOGY1ZWExYmQyY2Q2ZTE5YTQxOTdmZDQyOWM0ZiIsIm5iZiI6MTcyODM1ODA5My4yNDQ5NzgsInN1YiI6IjY3MDQ4MjQ3MzIyZDNlYTgzMTFkMmY4MiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.QcfckMfJrYcxjqMiMYCc1LBKcF7Tf5KETUk-op1zhXg"; // Token yang benar

  useEffect(() => {
    const fetchRatedMovies = async () => {
      try {
        const response = await axios.get(API_URL, {
          headers: {
            Authorization: bearerToken,
          },
        });
        console.log("Data dari API:", response.data); // Debug respons API
        setRatedMovies(response.data.results); // Sesuaikan dengan struktur respons API
      } catch (error) {
        console.error("Error fetching rated movies:", error);
        setError("Gagal mengambil data film yang di-rating. Coba lagi nanti.");
      } finally {
        setLoading(false);
      }
    };

    fetchRatedMovies();
  }, []);

  if (loading) {
    return (
      <div className="text-center text-gray-400 min-h-screen flex items-center justify-center">
        Memuat film yang di-rating...
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-red-500 min-h-screen flex items-center justify-center">
        {error}
      </div>
    );
  }

  if (ratedMovies.length === 0) {
    return (
      <div className="text-center text-gray-400 min-h-screen flex items-center justify-center">
        Belum ada film yang di-rating.
      </div>
    );
  }

  return (
    <div
      className={`min-h-screen py-10 ${
        isDarkMode ? "bg-gray-900" : "bg-slate-500"
      } text-white transition-all duration-1000`}
    >
      <h1 className="text-center text-3xl py-6 text-purple-500">
        Film yang Anda Rating
      </h1>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 px-8">
        {ratedMovies.map((movie) => (
          <Link to={`/movie/${movie.id}`} key={movie.id}>
            <div className="relative bg-black rounded-lg overflow-hidden shadow-lg border border-purple-600 transform transition-all hover:scale-105 hover:shadow-2xl">
              <div className="absolute inset-0 bg-gradient-to-t from-purple-900 to-transparent opacity-70"></div>
              <img
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
                className="w-full h-64 object-cover rounded-t-lg"
              />
              <div className="absolute bottom-0 left-0 right-0 p-4 backdrop-blur-sm bg-black/30 rounded-b-lg">
                <h3 className="text-lg font-semibold text-white">
                  {movie.title}
                </h3>
                <p className="text-sm text-gray-300">
                  Rating Anda:{" "}
                  <span className="text-yellow-400">{movie.vote_average} / 10</span> {/* Rating dari TMDB */}
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default RatedMovies;
