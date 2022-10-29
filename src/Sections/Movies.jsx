import React from 'react'
import './Movies.css'
export default function Movies() {
  return (
    <>
        <div className="moviesSectionTitle">
          <div className="movieTitle">
          <p className="glitch">
                <span aria-hidden="true">Actors</span>
                Actors
                <span aria-hidden="true">Actors</span>
              </p>

            {/* list of spiderman actors */}
            
          </div>
          <ul className='list'>
                <li>Tobey Maguire</li>
                <li>Andrew Garfield</li>
                <li>Tom Holland</li>
            </ul>
        </div>
        <div className="moviesSection">
        </div>
    </>
  )
}
