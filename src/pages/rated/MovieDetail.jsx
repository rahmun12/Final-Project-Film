import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Undo2Icon } from "lucide-react"; // Menggunakan icon dari lucide-react
import { useSelector } from "react-redux";
import axios from "axios";

const MovieDetail = () => {
  const { id } = useParams();
  const [film, setFilm] = useState(null);
  const [userRating, setUserRating] = useState(0);
  const [error, setError] = useState(null);
  const isDarkMode = useSelector((state) => state.theme.isDarkMode);

  const API_KEY = "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwNGJlOGY1ZWExYmQyY2Q2ZTE5YTQxOTdmZDQyOWM0ZiIsIm5iZiI6MTcyODM1ODA5My4yNDQ5NzgsInN1YiI6IjY3MDQ4MjQ3MzIyZDNlYTgzMTFkMmY4MiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.QcfckMfJrYcxjqMiMYCc1LBKcF7Tf5KETUk-op1zhXg";
  
  useEffect(() => {
    const getFilm = async () => {
      try {
        const response = await axios.get(`https://api.themoviedb.org/3/movie/${id}`, {
          headers: {
            Authorization: API_KEY,
          },
        });
        setFilm(response.data);

        // Periksa apakah film telah di-rating
        const ratedResponse = await axios.get(
          `https://api.themoviedb.org/3/account/21559552/rated/movies`, 
          { headers: { Authorization: API_KEY } }
        );
        
        const ratedMovie = ratedResponse.data.results.find((movie) => movie.id === parseInt(id));
        if (ratedMovie) {
          setUserRating(ratedMovie.rating);
        }
      } catch (error) {
        console.error("Error fetching film data:", error);
        setError("Gagal mengambil data film. Coba lagi nanti.");
      }
    };

    getFilm();
  }, [id]);

  const handleCancelRating = async () => {
    try {
      await axios.delete(
        `https://api.themoviedb.org/3/movie/${id}/rating`, 
        { headers: { Authorization: API_KEY } }
      );
      setUserRating(0); // Reset rating di UI
    } catch (error) {
      console.error("Error cancelling rating:", error);
      setError("Gagal membatalkan rating. Coba lagi nanti.");
    }
  };

  if (!film) return <div className="text-center text-gray-400">Loading...</div>;

  const posterUrl = `https://image.tmdb.org/t/p/w500${film.poster_path}`;

  return (
    <div className={`flex justify-center items-center min-h-screen ${isDarkMode ? "bg-gray-900" : "bg-gray-500"} transition-all duration-1000`}>
      <div className="card bg-gray-800 max-w-sm w-full h-full shadow-xl border border-purple-600 rounded-lg transition-transform transform hover:scale-105">
        <figure>
          <img className="w-full h-48 object-cover rounded-t-lg" src={posterUrl} alt={film.title} />
        </figure>
        <div className="card-body p-4 flex flex-col justify-between h-full">
          <h2 className="card-title text-purple-400 text-lg">{film.title}</h2>
          <p className="line-clamp-2 text-gray-300 mb-4">{film.overview}</p>
          <div className="flex justify-between mb-4">
            <div className="badge badge-outline text-purple-600">{film.release_date}</div>
            <div className="badge badge-outline text-purple-600">⭐ {film.vote_average}</div>
          </div>

          {userRating > 0 ? (
            <div className="flex items-center mb-4">
              <button
                className="bg-gradient-to-r from-red-600 to-red-800 text-white font-bold py-2 px-4 rounded-full shadow-lg hover:shadow-xl transition-transform transform hover:scale-110 flex items-center space-x-2"
                onClick={handleCancelRating}
              >
                <Undo2Icon className="w-5 h-5" /> 
                <span>Batalkan Rating</span>
              </button>
            </div>
          ) : (
            <div className="text-gray-400">Anda belum memberi rating film ini.</div>
          )}

          <button className="bg-purple-600 hover:bg-purple-800 text-white font-bold py-2 rounded-full transition-transform transform hover:scale-105">
            Tonton
          </button>
        </div>
      </div>
    </div>
  );
};

export default MovieDetail;
