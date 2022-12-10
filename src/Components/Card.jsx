import React from "react";
import Dentist from "../assets/dentist.png";
import { NavLink } from "react-router-dom";

const Card = ({ name, username, id, isFavorite = false }) => {
  const addFav = () => {
    const favoritos = JSON.parse(localStorage.getItem("favoritos"));
    if (favoritos === null) {
      localStorage.setItem("favoritos", JSON.stringify([id]));
    }
    const esFavorito = favoritos?.find((idGuardado) => idGuardado === id);

    if (esFavorito) {
      localStorage.setItem(
        "favoritos",
        JSON.stringify(favoritos?.filter((idGuardado) => idGuardado !== id))
      );
      return;
    }
    localStorage.setItem("favoritos", JSON.stringify([...favoritos, id]));
  };

  return (
    <div className="card">
      <NavLink key={id} to={`/dentista/${id}`}>
        <h2># {id}</h2>
        <img
          src={Dentist}
          alt="dentist"
          width={150}
          style={{ filter: "invert(0.7) sepia(1)" }}
        />
        <span> Nombre: {name}</span>
        <span>Usuario: {username}</span>
      </NavLink>
      {!isFavorite && (
        <button onClick={addFav} className="favButton">
          Add fav
        </button>
      )}
    </div>
  );
};

export default Card;
