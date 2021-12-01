import React, { useState } from "react";
import { useQuery } from "react-query";
import Planet from "./Planet";

const fetchPlanets = async ({ queryKey }) => {
  const res = await fetch(
    `http://swapi.dev/api/planets/?page=${queryKey[1].page}`
  );
  return res.json();
};

function Planets() {
  const [page, setPage] = useState(1);
  const { data, status } = useQuery(["planets", { page }], fetchPlanets);

  return (
    <div>
      <h2>Planets</h2>
      <button onClick={() => setPage(page - 1)}>Previous</button>
      <button onClick={() => setPage(page + 1)}>Next</button>

      {status === "loading" && <div>Loading...</div>}
      {status === "error" && <div>Error</div>}
      {status === "success" && (
        <div>
          {data.results.map((planet) => (
            <Planet planet={planet} key={planet.name} />
          ))}
        </div>
      )}
    </div>
  );
}

export default Planets;
