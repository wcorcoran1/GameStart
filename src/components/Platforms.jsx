// This is our platform component that makes up the platform page of our app.
// These are our imports that we used for this component
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import useAuth from "../hooks/useAuth";

  
  const Platforms = ({selectedGame, setSelectedGame}) =>{
    const { platforms, setPlatforms, user } = useAuth()
    const [platformList, setPlatformList] = useState('')
    
    useEffect(() => {
      setPlatforms(platforms)
    },[platformList])

    console.log(platforms)
    const handleAddToCart = () => {
      console.log(selectedGame);
      console.log(user);
    };
    // This return makes up the HTML that is on our platform webpage
    return(
      <div className="platformpage">
    <>
    <h1>Platforms</h1>

    {platforms ? platforms.map((platform) => {
      return (

      <div key={platform.id}>
        <ul>
          <li>
            <h2>{platform.name}</h2>
            </li>
            <li>
            <Link className="link" to="/games">
          AllGames{" "}
        </Link>
        <h6>-</h6>
            {platform.games.length > 0 ? platform.games.map((platformGame)=>{
              return(
              <ul key={platformGame.id}>
                  <div>
        <img src="/images/gameplaceholder.png" alt="not found" />
      </div>
                <li>
                  <h4>Title: {platformGame.name}</h4>
                </li>
                <li>
                  <h4>description: {platformGame.description}</h4>
                </li>
                <li>
                  <h4>players: {platformGame.players}</h4>
                </li>
                <li>
                  <h4>age_rating: {platformGame.age_rating}</h4>
                </li>
                <li>
                  <h4>Cost: {platformGame.cost}</h4>
                </li>
                <button onClick={handleAddToCart}>Add to Cart</button>
                <h2>------------------------------</h2>
              </ul>)
            }) : null}
            </li>
            <li>
            <Link className="link" to="/hardware">Accessories</Link>
          </li>
        </ul>
        <h2>------------------------------</h2>
      </div>
    )}) : null }
  </>
  </div>
)

}
export default Platforms