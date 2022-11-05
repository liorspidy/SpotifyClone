import { useContext, useState } from 'react';
import classes from './Header.module.css';
import SearchBar from './SearchBar';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import Login from '../Login';
import DataLayerContext from '../store/DataLayerContext';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import LaunchIcon from '@mui/icons-material/Launch';
import SpotifyWebApi from 'spotify-web-api-js';

const spotify = new SpotifyWebApi();

const Header = (props) => {
  const ctx = useContext(DataLayerContext);
  const [isGoBackShown, setIsGoBackShown] = useState(false);
  const [isGoForwardShown, setIsGoForwardShown] = useState(false);
  const [isUserDetailsActive, setIsUserDetailsActive] = useState(false);
  const [isUserShown, setIsUserShown] = useState(false);

  const showGoBackArrowDesc = () => {
    setIsGoBackShown(true);
  };

  const showGoForwardArrowDesc = () => {
    setIsGoForwardShown(true);
  };

  const hideGoBackArrowDesc = () => {
    setIsGoBackShown(false);
  };

  const hideGoForwardArrowDesc = () => {
    setIsGoForwardShown(false);
  };

  const userDetailsHandler = () => {
    setIsUserDetailsActive((prevState) => (prevState = !prevState));
  };

  const showUserDesc = () => {
    setIsUserShown(true);
  };

  const hideUserDesc = () => {
    setIsUserShown(false);
  };

  const userArrowClass = isUserDetailsActive
    ? `${classes.arrowUp}`
    : `${classes.arrowDown}`;

  const logOutHandler = () => {
    window.location.reload();
  };
  return (
    <header className={classes.header}>
      <div className={classes.actions}>
        <div className={classes.arrows}>
          <div className={classes.arrow}>
            <div
              className={classes.arrowLeft}
              onMouseEnter={showGoBackArrowDesc}
              onMouseLeave={hideGoBackArrowDesc}
            >
              <ArrowForwardIosIcon />
            </div>
            {isGoBackShown && <div className={classes.arrowDesc}>Go back</div>}
          </div>
          <div className={classes.arrow}>
            <div
              className={classes.arrowRight}
              onMouseEnter={showGoForwardArrowDesc}
              onMouseLeave={hideGoForwardArrowDesc}
            >
              <ArrowForwardIosIcon />
            </div>
            {isGoForwardShown && (
              <div className={classes.arrowDesc}>Go forward</div>
            )}
          </div>
          {props.isSearchPressed && ctx.token && <SearchBar />}
        </div>
        {!ctx.token && (
          <div className={classes.buttons}>
            <div className={classes.extraFeatures}>
              <button className={classes.extraFeature}>Premium</button>
              <button className={classes.extraFeature}>Support</button>
              <button className={classes.extraFeature}>Download</button>
            </div>
            <button className={classes.signup}>Sign up</button>
            <Login />
          </div>
        )}
        {ctx.token && (
          <div
            className={classes.userDetails}
            onClick={userDetailsHandler}
            onMouseEnter={showUserDesc}
            onMouseLeave={hideUserDesc}
          >
            <img
              className={classes.userImage}
              src={ctx.user?.images[0].url}
              alt={ctx.user?.display_name}
            ></img>
            <div className={classes.userName}>{ctx.user?.display_name}</div>
            <ArrowDropDownIcon className={userArrowClass} />
            {isUserShown && (
              <div className={classes.userDesc}>{ctx.user?.display_name}</div>
            )}
          </div>
        )}
        {ctx.token && isUserDetailsActive && (
          <div className={classes.userOptions}>
            <ul>
              <div className={classes.userOptionItem}>
                <li>Account</li>
                <LaunchIcon className={classes.launchIcon} />
              </div>
              <div className={classes.userOptionItem}>
                <li>Profile</li>
              </div>
              <div className={classes.userOptionItem}>
                <li>Support</li>
                <LaunchIcon className={classes.launchIcon} />
              </div>
              <div className={classes.userOptionItem}>
                <li>Download</li>
                <LaunchIcon className={classes.launchIcon} />
              </div>
              <div className={classes.userOptionItem}>
                <li>Settings</li>
              </div>
              <div className={classes.userOptionItem} onClick={logOutHandler}>
                <li>Log out</li>
              </div>
            </ul>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
