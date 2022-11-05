import { createContext } from 'react';
import { useState } from 'react';

const DataLayerContext = createContext({
  user: null,
  playlists: [],
  playing: false,
  item: null,
  token: null,
  loginUser: (usedata) => {},
  playingTrackToggle: () => {},
  setToken: (token) => {},
  addToPlaylist: (playlist) => {},
});

export const DataLayer = (props) => {
  const [userData, setUserData] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [receivedToken, setReceivedToken] = useState(null);
  const [playlistList, setPlaylistList] = useState([]);
  const LoginUserHandler = (userdata) => {
    setUserData(userdata);
  };

  const IsPlayingTrackHandler = () => {
    setIsPlaying((prevState) => (prevState = !prevState));
  };

  const receivedTokenHandler = (token) => {
    setReceivedToken(token);
  };

  const addToPlaylistsHandler = (playlist) => {
    setPlaylistList(playlist);
  };

  const context = {
    user: userData,
    playlists: playlistList,
    playing: isPlaying,
    item: null,
    token: receivedToken,
    loginUser: LoginUserHandler,
    playingTrackToggle: IsPlayingTrackHandler,
    setToken: receivedTokenHandler,
    addToPlaylist: addToPlaylistsHandler,
  };

  return (
    <DataLayerContext.Provider value={context}>
      {props.children}
    </DataLayerContext.Provider>
  );
};

export default DataLayerContext;
