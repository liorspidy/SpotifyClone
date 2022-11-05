import './App.css';
import Header from './Header/Header';
import Main from './sidebar/Main';
import DefaultPage from './pages/DefaultPage';
import { useContext, useEffect, useState } from 'react';
import { getTokenFromUri } from './Login';
import SpotifyWebApi from 'spotify-web-api-js';
import DataLayerContext from './store/DataLayerContext';
import Footer from './footer/Footer';
import Search from './pages/Search';
import CloneWelcome from './pages/CloneWelcome';

const spotify = new SpotifyWebApi();

const App = () => {
  const ctx = useContext(DataLayerContext);
  const [isSearchPressed, setIsSearchPressed] = useState(false);
  const [currentTrack, setCurrentTrack] = useState({});
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const getSpotifyData = (tokenData) => {
      spotify.setAccessToken(tokenData);
      spotify
        .getMe()
        .then((user) => ctx.loginUser(user))
        .catch((error) => console.log(error.message));
      spotify
        .getUserPlaylists()
        .then((playlists) => ctx.addToPlaylist(playlists))
        .catch((error) => console.log(error.message));

      spotify
        .getMyCurrentPlayingTrack()
        .then((res) => setCurrentTrack(res))
        .catch((error) => console.log(error.message));

      spotify
        .getCategories()
        .then((res) => {
          setCategories(res.categories.items);
        })
        .catch((error) => console.log(error.message));
    };

    const hash = getTokenFromUri();
    window.location.hash = '';
    const received_token = hash.access_token;
    if (received_token) {
      ctx.setToken(received_token);
      getSpotifyData(received_token);
    }
  }, [ctx]);

  useEffect(() => {
    categories.forEach((cat) => {
      spotify
        .getCategoryPlaylists(cat.id)
        .then((res) => {
          cat.image = res.playlists.items[0].images[0].url;
        })
        .catch((error) => console.log(error.message));
    });
  }, [categories]);

  return (
    <div className="App">
      <div className="notFooter">
        <Main onSearch={setIsSearchPressed} isSearchPressed={isSearchPressed} />
        <div className="mainPages">
          <Header isSearchPressed={isSearchPressed} />
          {!ctx.token && <CloneWelcome />}
          {!isSearchPressed && ctx.token && <DefaultPage />}
          {isSearchPressed && ctx.token && (
            <Search setCategories={setCategories} categories={categories} />
          )}
        </div>
      </div>
      <div className="footer">
        <Footer currentTrack={currentTrack} />
      </div>
    </div>
  );
};

export default App;
