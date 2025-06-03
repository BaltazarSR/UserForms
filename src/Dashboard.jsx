import React, { useState, useEffect } from "react";
import { spotifyAPI } from "./api/spotifyAPI";
import { useNavigate } from "react-router-dom";
import "./Dashboard.css";

const Dashboard = () => {
  const navigate = useNavigate();

  const selectTypes = [
    "album",
    "artist",
    "playlist",
    "track",
    "show",
    "episode",
    "audiobook",
  ];
  const [search, setSearch] = useState({
    song: "",
    types: "",
  });

  const userId = localStorage.getItem("UserId")

  const [deviceID, setDeviceID] = useState("");

  const [results, setResults] = useState([]);

  const [favorites, setFavorites] = useState([]);

  const [favoritesList, setFavoritesList] = useState([]);

  const [refreshFavorites, setRefreshFavorites] = useState(false);

  const handleAddFavorite = (result) => {
    console.log(result);

    const isAlreadyFav = favorites.some((fav) => fav.id === result.id);

    if (isAlreadyFav) {
      console.log("Ya esta en favs");
      setFavorites((prev) => prev.filter((el) => el.id !== result.id));
    } else {
      setFavorites((prev) => [...prev, result]);
    }
  };

  const createFavs = async (favs) => {
    const userId = localStorage.getItem("UserId");
    const url = `http://localhost:3000/api/users/${userId}/favorites`;
    const data = {
      items: favs,
    };
    const result = await spotifyAPI(url, "POST", data, null);
    console.log(result);
    setRefreshFavorites((prev) => !prev);
  };

  const saveFavs = async (track) => {
    createFavs(track);
  };

  const handleGetFavorites = async () => {
    const url = `http://localhost:3000/api/users/${userId}/favorites`;
    const result = await spotifyAPI(url, "GET", null, null);
    // console.log(result)
    setFavoritesList(result);
  };

  const handleDeleteFavorites = async (favorite) => {
    const url = `http://localhost:3000/api/users/${userId}/favorites/delete`;
    const result = await spotifyAPI(url, "DELETE", favorite, null);
    console.log(favorite);
    setRefreshFavorites((prev) => !prev);
  };

  const handleChange = (e) => {
    const { value, name } = e.target;
    const newFom = {
      ...search,
      [name]: value,
    };
    console.log(newFom);
    setSearch(newFom);
  };

  const handleSearch = async () => {
    const params = new URLSearchParams();

    params.append("q", encodeURIComponent(`remaster track: ${search.song}`));
    params.append("type", search.types);

    const queryString = params.toString();
    const url = "https://api.spotify.com/v1/search";

    const updateUrl = `${url}?${queryString}`;
    const token = localStorage.getItem("access_token");

    const response = await spotifyAPI(updateUrl, "GET", null, token);
    console.log(response);
    setResults(response.tracks.items);
  };

  const getDeviceID = async () => {
    const token = localStorage.getItem("access_token");
    const url = "https://api.spotify.com/v1/me/player/devices";
    const response = await spotifyAPI(url, "GET", null, token);

    console.log(response);
    setDeviceID(response.devices[0].id);
  };

  const handlePlay = async (song) => {
    const token = localStorage.getItem("access_token");
    const data = {
      uris: [song],
    };
    const url = `https://api.spotify.com/v1/me/player/play?device_id=${deviceID}`;
    const play = await spotifyAPI(url, "PUT", data, token);
    console.log(play);
  };

  const showFavs = () => {
    navigate("/favs");
  };

  const isFavorite = (track) => {
    return favoritesList.some(fav => fav.items.id === track.id);
  };

  useEffect(() => {
    getDeviceID();
    handleGetFavorites();
  }, [refreshFavorites]);

  return (
    <>
      <div className="container-main-dash">
        <div className="container-log-dash">
          <h1 className="main-text">Dashboard</h1>
          <div className="container-dashboard">
            <button className="input-button" onClick={showFavs}>
              Show favorites
            </button>
            {/* <button className="input-button" onClick={saveFavs}>Save favorites</button> */}
            <div className="container-search">
              <div className="sub-text-dash">Search</div>
              <label className="input-box-half">
                <input
                  name="song"
                  type="text"
                  value={search.song}
                  onChange={handleChange}
                />
              </label>
            </div>
            <div className="sub-text-dash">Select Types</div>
            <select
              name="types"
              value={search.types}
              onChange={handleChange}
              className="select-dashboard"
            >
              {selectTypes.map((type) => (
                <option key={type} value={type}>
                  {type.charAt(0).toUpperCase() + type.slice(1)}
                </option>
              ))}
            </select>

            <button className="search-button" onClick={handleSearch}>
              Search
            </button>

            {results.map((result, idx) => (
              <div key={idx} className="track-container">
                <div>
                  <img
                    src={result.album.images[0].url}
                    width={150}
                    alt="Album Cover"
                  />
                </div>
                <div className="song-title">
                  <p>{result.name}</p>
                </div>
                <div className="button-container">
                  <button
                    className="track-button"
                    onClick={() => handlePlay(result.uri)}
                  >
                    ▶
                  </button>
                  {(
                    isFavorite(result) ? 
                    (<button
                      className="track-button"
                      onClick={() => handleDeleteFavorites(result)}
                    >
                      ✖
                    </button>) :
                    (<button
                      className="track-button"
                      onClick={() => saveFavs(result)}
                    >
                      ♥︎
                    </button>)
                  )}
                  
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
