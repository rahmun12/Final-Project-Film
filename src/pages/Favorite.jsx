import React, { useEffect } from "react";
import { useSelector } from "react-redux";
const Favorite = () => {
  const isDarkMode = useSelector((state) => state.theme.isDarkMode);
  const [favorites, setFavorites] = React.useState([]);

  useEffect(() => {
    const storedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
    setFavorites(storedFavorites);
  }, []); 

  const removeFavorite = (id) => {
    const updatedFavorites = favorites.filter((film) => film.id !== id);
    setFavorites(updatedFavorites);
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
  };

  return (
    <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4 ${
        isDarkMode ? "bg-gray-900" : "bg-slate-500"
      } text-white transition-all duration-1000`}>
      {favorites.length > 0 ? (
        favorites.map((film) => (
          <div
            key={film.id}
            className="card bg-gray-800 shadow-xl w-[200px] h-[300px] border border-purple-600 rounded-lg transition-transform transform hover:scale-105"
          >
            <a
              href={`/detail/${film.id}`}
              className="block overflow-hidden rounded-t-lg"
            >
              <img
                src={`https://image.tmdb.org/t/p/w500/${film.poster_path}`}
                alt={film.title}
                className="w-full h-48 object-cover transition-transform transform hover:scale-105"
              />
            </a>
            <div className="card-body p-4">
              <h2 className="card-title text-purple-400">{film.title}</h2>
              <p className="line-clamp-2 text-gray-300">{film.overview}</p>
              <button
                className="btn bg-red-600 hover:bg-red-800 text-white mt-2 rounded-full px-4 py-2 transition-transform transform hover:scale-105"
                onClick={() => removeFavorite(film.id)}
              >
                Hapus
              </button>
            </div>
          </div>
        ))
      ) : (
        <div className="text-center text-gray-400">Belum ada film favorit yang ditambahkan.</div>
      )}
    </div>
  );
};

export default Favorite;
