import axios from "axios";
import { HeartIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

const DetailBeranda = () => {
  const isDarkMode = useSelector((state) => state.theme.isDarkMode);

  const { id } = useParams();
  const [film, setFilm] = useState(null);
  const [userRating, setUserRating] = useState(0);
  const [isFavorite, setIsFavorite] = useState(false);

  const getFilm = async () => {
    try {
      const response = await fetch(`https://api.themoviedb.org/3/movie/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwNGJlOGY1ZWExYmQyY2Q2ZTE5YTQxOTdmZDQyOWM0ZiIsIm5iZiI6MTcyODM1ODA5My4yNDQ5NzgsInN1YiI6IjY3MDQ4MjQ3MzIyZDNlYTgzMTFkMmY4MiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.QcfckMfJrYcxjqMiMYCc1LBKcF7Tf5KETUk-op1zhXg",
        },
      });
      const data = await response.json();
      console.log(data);
      setFilm(data);

      const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
      const isFavorite = favorites.some((favorite) => favorite.id === data.id);
      setIsFavorite(isFavorite);
    } catch (error) {
      console.error("Error fetching film data:", error);
    }
  };

  const toggleFavorite = () => {
    const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
    if (isFavorite) {
      const updatedFavorites = favorites.filter(
        (favorite) => favorite.id !== film.id
      );
      localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
    } else {
      favorites.push(film);
      localStorage.setItem("favorites", JSON.stringify(favorites));
    }
    setIsFavorite(!isFavorite);
  };

  const handleRating = async (rating) => {
    setUserRating(rating);
    try {
      const res = await axios.post(
        `https://api.themoviedb.org/3/movie/${id}/rating`,
        { value: rating },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwNGJlOGY1ZWExYmQyY2Q2ZTE5YTQxOTdmZDQyOWM0ZiIsIm5iZiI6MTcyODM1ODA5My4yNDQ5NzgsInN1YiI6IjY3MDQ4MjQ3MzIyZDNlYTgzMTFkMmY4MiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.QcfckMfJrYcxjqMiMYCc1LBKcF7Tf5KETUk-op1zhXg",
          },
        }
      );
      console.log(res.data);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    getFilm();
  }, [id]);

  if (!film) {
    return <div className="text-center text-gray-400">Loading...</div>;
  }

  const posterUrl = `https://image.tmdb.org/t/p/w500${film.poster_path}`;

  return (
    <div
      className={`flex justify-center items-center min-h-screen  ${
        isDarkMode ? "bg-gray-900" : "bg-gray-500"
      } transition-all duration-1000`}
    >
      <div className="card bg-gray-800 max-w-sm w-full h-full shadow-xl border border-purple-600 rounded-lg transition-transform transform hover:scale-105">
        <figure>
          <img
            className="w-full h-48 object-cover rounded-t-lg"
            src={posterUrl}
            alt={film.title}
          />
        </figure>
        <div className={`card-body p-4 flex flex-col justify-between h-full`}>
          <h2 className="card-title text-purple-400 text-lg">{film.title}</h2>
          <p className="line-clamp-2 text-gray-300 mb-4">{film.overview}</p>
          <div className="flex justify-between mb-4">
            <div className="badge badge-outline text-purple-600">
              {film.release_date}
            </div>
            <div className="badge badge-outline text-purple-600">
              ⭐ {film.vote_average}
            </div>
          </div>

          <div className="flex items-center mb-4">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((rating) => (
              <span
                key={rating}
                className={`cursor-pointer text-xl ${
                  userRating >= rating ? "text-yellow-400" : "text-gray-400"
                }`}
                onClick={() => handleRating(rating)}
              >
                ★
              </span>
            ))}
          </div>

          <div className="flex items-center mb-4">
            <button
              className={`btn ${isFavorite ? "text-red-600" : "text-gray-500"}`}
              onClick={toggleFavorite}
            >
              <HeartIcon
                className={`mr-2 ${
                  isFavorite ? "text-red-600" : "text-gray-500"
                }`}
              />
              {isFavorite ? "Remove from Favorites" : "Add to Favorites"}
            </button>
          </div>

          <button className="bg-purple-600 hover:bg-purple-800 text-white font-bold py-2 rounded-full transition-transform transform hover:scale-105">
            Tonton
          </button>
        </div>
      </div>
    </div>
  );
};

export default DetailBeranda;
