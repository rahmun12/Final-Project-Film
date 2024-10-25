import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const BerandaView = ({ data, backgroundMovie }) => {
  const isDarkMode = useSelector((state) => state.theme.isDarkMode);

  const backgroundImageUrl = backgroundMovie
    ? `https://image.tmdb.org/t/p/original${backgroundMovie.poster_path}`
    : "";

  return (
    <div
      className={`relative min-h-screen ${
        isDarkMode ? "bg-gray-900" : "bg-slate-500"
      } text-white transition-all `}
      style={{
        backgroundImage: `url(${backgroundImageUrl})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="absolute inset-0 bg-black bg-opacity-80"></div>

      <div className="relative hero-section py-16 flex flex-col items-center justify-center text-center">
        <h1
          className={`text-4xl md:text-5xl font-bold bg-gradient-to-b ${
            isDarkMode ? "text-purple-500" : "text-black"
          } from-purple-600 to-gray-800 bg-clip-text text-transparent`}
        >
          Selamat Datang di Web Film
        </h1>

        <p className="text-lg md:text-xl text-gray-400 mt-5 mb-6 max-w-xl">
          Temukan film-film terbaru dan terpopuler di sini!
        </p>

        <Link
          to="/kategori"
          className="bg-purple-600 hover:bg-purple-800 text-white font-bold py-3 px-6 rounded-full transition-transform transform hover:scale-105"
        >
          Explore Now
        </Link>
      </div>

      <div className="relative section-film w-full py-10">
        <h2
          className={`text-3xl font-bold ${
            isDarkMode ? "text-white" : "text-purple-400"
          } transition-all duration-1000 mb-6 text-center`}
        >
          Trending Film
        </h2>

        <div className="film-carousel flex overflow-x-auto space-x-5 px-4">
          {data?.map((item, index) => (
            <div
              key={index}
              className="bg-purple-950 p-5 rounded-lg shadow-lg max-w-[250px] md:max-w-[350px] hover:shadow-2xl transition-shadow flex-none transform hover:scale-105"
            >
              <Link to={`/detail/${item.id}`} className="block overflow-hidden rounded-lg">
                <img
                  src={`https://image.tmdb.org/t/p/w500/${item.poster_path}`}
                  alt={item.title}
                  className="w-full h-64 object-cover transition-transform transform hover:scale-110"
                />
              </Link>
              <h3 className="text-base font-bold text-gray-200 mt-4 line-clamp-1">
                {item.title}
              </h3>
              <p className="text-sm text-gray-400 mt-2 line-clamp-2">
                {item.overview}
              </p>
            </div>
          ))}
        </div>
      </div>

      <footer className="relative py-8 text-center bg-gray-800">
        <p className="text-gray-400 text-sm">
          &copy; 2024 Web Film. All rights reserved.
        </p>
      </footer>
    </div>
  );
};

export default BerandaView;
