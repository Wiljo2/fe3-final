import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Dentist from "../assets/dentist.png";

//Este componente debera ser estilado como "dark" o "light" dependiendo del theme del Context

const Detail = () => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState({});
  let { id } = useParams();

  useEffect(() => {
    axios(`https://jsonplaceholder.typicode.com/users/${id}`).then((res) => {
      setData(res.data);
      setLoading(false);
    });
  }, [id]);

  if (loading) {
    return (
      <>
        <h1>Detail Dentist {id}</h1>
        <p>Loading</p>
      </>
    );
  }

  return (
    <>
      <h1>Detail Dentist # {id} </h1>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <img
          src={Dentist}
          alt="dentist"
          width={150}
          style={{ filter: "invert(0.7) sepia(1)" }}
        />
        <h2>{data.name}</h2>
        <h2>{data.email}</h2>
        <h2>{data.phone}</h2>
        <h2>{data.website}</h2>
      </div>
    </>
  );
};

export default Detail;
