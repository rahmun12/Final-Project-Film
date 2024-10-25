import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import BerandaView from "./BerandaView";
import { fetchTrendingMovies } from "../../store/reducers/movieSlice";

const Beranda = () => {
  const dispatch = useDispatch();
  const { trending, loading, error } = useSelector((state) => state.movies);
  
  const [backgroundMovie, setBackgroundMovie] = useState(null);

  useEffect(() => {
    dispatch(fetchTrendingMovies());
  }, [dispatch]);

  useEffect(() => {
    if (trending.length > 0) {
      const randomMovie = trending[Math.floor(Math.random() * trending.length)];
      setBackgroundMovie(randomMovie);
    }
  }, [trending]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-72">
        <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent border-solid rounded-full animate-spin"></div>
      </div>
    );
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return <BerandaView data={trending} backgroundMovie={backgroundMovie} />;
};

export default Beranda;
