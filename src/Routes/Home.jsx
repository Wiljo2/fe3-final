import React, { useContext } from "react";
import Card from "../Components/Card";
import GlobalContext from "../Store/context";

//Este componente debera ser estilado como "dark" o "light" dependiendo del theme del Context

const Home = () => {
  const {
    state: { data },
    loading,
  } = useContext(GlobalContext);
  return (
    <main className="">
      <h1>Home</h1>
      <div className="card-grid">
        {loading && <p>loading</p>}
        {!loading &&
          data?.map(({ id, name, username }) => (
            <Card key={id} id={id} name={name} username={username} />
          ))}
      </div>
    </main>
  );
};

export default Home;
