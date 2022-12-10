import Footer from "./Components/Footer";
import Navbar from "./Components/Navbar";
import { Route, Routes, Navigate } from "react-router-dom";
import Home from "./Routes/Home";
import Detail from "./Routes/Detail";
import Contact from "./Routes/Contact";
import Favs from "./Routes/Favs";

function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={<Navigate replace to="/home" />} />
        <Route path="/home" element={<Home />} />
        <Route path="/dentista/:id" element={<Detail />} />
        <Route path="/contacto" element={<Contact />} />
        <Route path="/favs" element={<Favs />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
