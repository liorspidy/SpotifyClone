import classes from './Main.module.css';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import HomeIcon from '@mui/icons-material/Home';
import ZoomInIcon from '@mui/icons-material/ZoomIn';
import SearchIcon from '@mui/icons-material/Search';
import LibraryMusicOutlinedIcon from '@mui/icons-material/LibraryMusicOutlined';
import LibraryMusicIcon from '@mui/icons-material/LibraryMusic';
import AddBoxIcon from '@mui/icons-material/AddBox';
import { useContext, useState } from 'react';
import DataLayerContext from '../store/DataLayerContext';
import PlaylistItem from './PlaylistItem';
import FavoriteIcon from '@mui/icons-material/Favorite';
import BookmarkIcon from '@mui/icons-material/Bookmark';

const Main = (props) => {
  const ctx = useContext(DataLayerContext);
  const [isHomePressed, setIsHomePressed] = useState(false);
  const [isLibraryPressed, setIsLibraryPressed] = useState(false);
  const [isCreatePlaylistPressed, setIsCreatePlaylistPressed] = useState(false);
  const [isFavoritesPressed, setIsFavoritesPressed] = useState(false);
  const [isBookmarkPressed, setIsBookmarkPressed] = useState(false);

  const homeButtonHandler = () => {
    setIsHomePressed(true);
    props.onSearch(false);
    setIsLibraryPressed(false);
    setIsCreatePlaylistPressed(false);
    setIsFavoritesPressed(false);
    setIsBookmarkPressed(false);
  };

  const searchButtonHandler = () => {
    setIsHomePressed(false);
    props.onSearch(true);
    setIsLibraryPressed(false);
    setIsCreatePlaylistPressed(false);
    setIsFavoritesPressed(false);
    setIsBookmarkPressed(false);
  };

  const libraryButtonHandler = () => {
    setIsHomePressed(false);
    props.onSearch(false);
    setIsLibraryPressed(true);
    setIsCreatePlaylistPressed(false);
    setIsFavoritesPressed(false);
    setIsBookmarkPressed(false);
  };

  const createPlaylistButtonHandler = () => {
    if (ctx.token) {
      setIsHomePressed(false);
      props.onSearch(false);
      setIsLibraryPressed(false);
      setIsCreatePlaylistPressed(true);
      setIsFavoritesPressed(false);
      setIsBookmarkPressed(false);
    }
  };

  const favoritesButtonHandler = () => {
    if (ctx.token) {
      setIsHomePressed(false);
      props.onSearch(false);
      setIsLibraryPressed(false);
      setIsCreatePlaylistPressed(false);
      setIsFavoritesPressed(true);
      setIsBookmarkPressed(false);
    }
  };

  const bookmarkButtonHandler = () => {
    if (ctx.token) {
      setIsHomePressed(false);
      props.onSearch(false);
      setIsLibraryPressed(false);
      setIsCreatePlaylistPressed(false);
      setIsFavoritesPressed(false);
      setIsBookmarkPressed(true);
    }
  };

  const playlists = ctx.playlists.items?.map((item) => {
    return (
      <li key={item.id}>
        <PlaylistItem name={item.name} />
      </li>
    );
  });

  return (
    <div className={classes.main}>
      <div className={classes.img}>
        <img
          className={classes.logo}
          src="https://storage.googleapis.com/pr-newsroom-wp/1/2018/11/Spotify_Logo_RGB_White.png"
          alt="logo"
          onClick={homeButtonHandler}
        ></img>
      </div>
      <div className={classes.mainNavigation}>
        <nav>
          <ul>
            <div className={classes.mainNavigationBox}>
              <div
                onClick={homeButtonHandler}
                className={classes.mainNavigationRow}
              >
                {isHomePressed ? (
                  <HomeIcon className={classes.IconActive} />
                ) : (
                  <HomeOutlinedIcon className={classes.Icon} />
                )}
                <li
                  className={
                    isHomePressed ? classes.navActionActive : classes.navAction
                  }
                >
                  Home
                </li>
              </div>
              <div
                onClick={searchButtonHandler}
                className={classes.mainNavigationRow}
              >
                {props.searchTerm ? (
                  <ZoomInIcon className={classes.IconActive} />
                ) : (
                  <SearchIcon className={classes.Icon} />
                )}
                <li
                  className={
                    props.searchTerm
                      ? classes.navActionActive
                      : classes.navAction
                  }
                >
                  Search
                </li>
              </div>{' '}
              <div
                onClick={libraryButtonHandler}
                className={classes.mainNavigationRow}
              >
                {isLibraryPressed ? (
                  <LibraryMusicIcon className={classes.IconActive} />
                ) : (
                  <LibraryMusicOutlinedIcon className={classes.Icon} />
                )}
                <li
                  className={
                    isLibraryPressed
                      ? classes.navActionActive
                      : classes.navAction
                  }
                >
                  Your Library
                </li>
              </div>
              <br />
              <div
                onClick={createPlaylistButtonHandler}
                className={classes.mainNavigationRow}
              >
                {
                  <AddBoxIcon
                    className={
                      isCreatePlaylistPressed
                        ? classes.IconActive
                        : classes.Icon
                    }
                  />
                }
                <li
                  className={
                    isCreatePlaylistPressed
                      ? classes.navActionActive
                      : classes.navAction
                  }
                >
                  Create Playlist
                </li>
              </div>
              <div
                onClick={favoritesButtonHandler}
                className={classes.mainNavigationRow}
              >
                <div className={classes.favoriteIconBack}>
                  {
                    <FavoriteIcon
                      className={
                        isFavoritesPressed
                          ? classes.favoriteIconActive
                          : classes.favoriteIcon
                      }
                    />
                  }
                </div>
                <li
                  className={
                    isFavoritesPressed
                      ? classes.navActionActive
                      : classes.navAction
                  }
                >
                  Liked Songs
                </li>
              </div>
              {ctx.token && (
                <div
                  onClick={bookmarkButtonHandler}
                  className={classes.mainNavigationRow}
                >
                  <div className={classes.bookmarkIconBack}>
                    {
                      <BookmarkIcon
                        className={
                          isBookmarkPressed
                            ? classes.bookmarkIconActive
                            : classes.bookmarkIcon
                        }
                      />
                    }
                  </div>
                  <li
                    className={
                      isBookmarkPressed
                        ? classes.navActionActive
                        : classes.navAction
                    }
                  >
                    Your Episodes
                  </li>
                </div>
              )}
            </div>
            {ctx.token && (
              <div className={classes.playlists}>
                <ul>{playlists}</ul>
              </div>
            )}
          </ul>
        </nav>
      </div>
      <div className={classes.more}></div>
    </div>
  );
};

export default Main;
