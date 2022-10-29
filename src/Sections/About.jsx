import React from "react";
import "./About.css";
export default function About() {

  const handleClick = () => {
    window.open("https://www.marvel.com/characters/spider-man-peter-parker");
  };

  return (
    <>
      <div className="aboutSection">
        <div className="aboutTitle">
          <p className="title">PETER PARKER</p>
          <span className="sub">(A real web developer)</span>
        </div>

        <div className="aboutText">
          <p className="text">
            A poor sickly orphan, is bitten by a
            radioactive spider. As a result of the bite, he gains superhuman
            strength, speed, and agility, along with the ability to cling to
            walls, turning him into Spider-Man.
          </p>

          <button type="button" className="button" onClick={handleClick}>Read More</button>
          
        </div>
      </div>
    </>
  );
}
