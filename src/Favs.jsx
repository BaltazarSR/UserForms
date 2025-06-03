import { spotifyAPI } from './api/spotifyAPI';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import "./Favs.css";

const Favs = () => {

  const navigate = useNavigate();

  const [favorites, setFavorites] = useState([]);
  const [refreshFavorites, setRefreshFavorites] = useState(false);
  const [deviceID, setDeviceID] = useState('')

  const userId = localStorage.getItem("UserId")

  const handleGetFavorites = async() => {
    const url = `http://localhost:3000/api/users/${userId}/favorites`
    const result = await spotifyAPI(url, "GET", null, null);
    // console.log(result)
    setFavorites(result);
  };

  const handleDeleteFavorites = async(favorite) => {
    const url = `http://localhost:3000/api/users/${userId}/favorites/delete`
    const result = await spotifyAPI(url, "DELETE", favorite, null);
    console.log(favorite);
    setRefreshFavorites(prev => !prev);
  }

  const showDashboard = () => {
    navigate("/dashboard");
  }

  const getDeviceID = async() => {
    const token = localStorage.getItem("access_token");
    const url = "https://api.spotify.com/v1/me/player/devices";
    const response = await spotifyAPI(url, 'GET', null, token);

    console.log(response);
    setDeviceID(response.devices[0].id);
  }

  const handlePlay = async (song) => {
    const token = localStorage.getItem("access_token");
    const data = {
      uris: [song]
    };
    const url = `https://api.spotify.com/v1/me/player/play?device_id=${deviceID}`;
    const play = await spotifyAPI(url, 'PUT', data, token);
    console.log(play);
  }

  useEffect(() => {
    getDeviceID();
    handleGetFavorites();
  }, [refreshFavorites]);

  return (
    <>
      <div className="container-main-favs">
        <div className="container-log-favs">
          <div className="main-text">Favorites</div>
          <button className="input-button" onClick={showDashboard}>Go back</button>
          {favorites.map((favorite, idx) => (
            <div key={idx} className="track-container">
              <div>
                <img
                  src={favorite.items.album.images[0].url}
                  width={150}
                  alt="Album Cover"
                />
              </div>
              <div className="song-title">
                <p>{favorite.items.name}</p>
              </div>
              <div className="button-container">
                <button
                  className="track-button"
                  onClick={() => handlePlay(favorite.items.uri)}
                >
                  ▶
                </button>
                <button
                  className="track-button"
                  onClick={() => handleDeleteFavorites(favorite.items)}
                >
                  ✖
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Favs;
