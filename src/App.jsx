import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Beranda from "./pages/beranda/Beranda";
import Footer from "./components/Footer";
import DetailBeranda from "./pages/detailberanda/DetailBeranda";
import Favorite from "./pages/Favorite";
import KategoriFilm from "./pages/kategori/KategoriFilm";
import HasilPencarian from "./pages/search/HasilPencarian";
import RatedMovies from "./pages/rated/RatedMovie";
import MovieDetail from "./pages/rated/MovieDetail";
import ThemeContext from "./components/context/ThemeContext";
import { useState } from "react";
import { Provider } from "react-redux";
import { store } from "./store/action/store";
import DaftarFilm from "./pages/kategori/DaftarFilm";

export default function App() {
  const theme = useState("light");

  return (
    <>
      <BrowserRouter>
        <ThemeContext.Provider value={theme}>
          <Provider store={store}>
            <Navbar />
            <Routes>
              <Route path="/" element={<Beranda />} />
              <Route path="/detail/:id" element={<DetailBeranda />} />
              <Route path="/favorite" element={<Favorite />} />
              <Route path="/rated-movies" element={<RatedMovies />} />
              <Route path="/kategori" element={<KategoriFilm />} />
              <Route path="/search" element={<HasilPencarian />} />
              <Route path="/movie/:id" element={<MovieDetail />} />
              <Route path="/film/:kategoriId" component={<DaftarFilm />} />

            </Routes>
          </Provider>
        </ThemeContext.Provider>

        <Footer />
      </BrowserRouter>
    </>
  );
}
