import React from "react";
import "./Credits.css";
export default function Credits() {
  return (
    <>
      <div className="creditsSection">
        <div className="creditsTitle">
          <p className="glitch">
            <span aria-hidden="true">‡</span>‡<span aria-hidden="true">‡</span>
          </p>
        </div>
        <div className="creditsText">
          <p className="Ctext aa">
            <a
              href="https://www.linkedin.com/in/pabloescobar/"
              className="Ctext aa"
              target="_blank"
              rel="noreferrer"
            >
              Pablo Escobar
            </a>
          </p>
        </div>
      </div>
    </>
  );
}
