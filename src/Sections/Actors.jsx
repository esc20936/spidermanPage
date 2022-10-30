import React from "react";
import "./Actors.css";
export default function Actors() {
  return (
    <>
      <div className="moviesSectionTitle">
        <div className="movieTitle">
          <p className="glitch">
            <span aria-hidden="true">Actors</span>
            Actors
            <span aria-hidden="true">Actors</span>
          </p>
        </div>
        <ul className="list">
          <li>Tobey Maguire</li>
          <li>Andrew Garfield</li>
          <li>Tom Holland</li>
        </ul>
      </div>
      <div className="moviesSection"></div>
    </>
  );
}
