import React, { useContext } from "react";
import Card from "../Components/Card";
import GlobalContext from "../Store/context";

//Este componente debera ser estilado como "dark" o "light" dependiendo del theme del Context

const Favs = () => {
  const {
    state: { data },
    loading,
  } = useContext(GlobalContext);

  const favoritos = JSON.parse(localStorage.getItem("favoritos"));
  const filteredData = data.filter(({ id }) => favoritos?.includes(id));

  return (
    <>
      <h1>Dentists Favs</h1>
      <div className="card-grid">
        {loading && <p>loading</p>}
        {!loading &&
          filteredData?.map(({ id, name, username }) => (
            <Card
              key={id}
              id={id}
              name={name}
              username={username}
              isFavorite={true}
            />
          ))}
      </div>
    </>
  );
};

export default Favs;
