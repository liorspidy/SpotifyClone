import { useContext, useEffect, useState } from 'react';
import classes from './DefaultPage.module.css';
import SpotifyWebApi from 'spotify-web-api-js';
import DataLayerContext from '../store/DataLayerContext';
import PlaylistRow from './PlaylistRow';

const spotify = new SpotifyWebApi();

const DefaultPage = (props) => {
  const ctx = useContext(DataLayerContext);
  const [myArtists, setMyArtists] = useState([]);
  const [myTopTracks, setMyTopTracks] = useState([]);
  const [myRecentTracks, setMyRecentTracks] = useState([]);

  useEffect(() => {
    if (ctx.token) {
      spotify
        .getMyTopArtists()
        .then((res) => {
          const artistsRow = [];
          for (var i = 0; i < 8; i++) {
            artistsRow.push(res.items[i]);
          }
          setMyArtists(artistsRow);
        })
        .catch((error) => console.log(error.message));

      spotify
        .getMyTopTracks()
        .then((res) => {
          const helperArray = [];
          for (var i = 0; i < 8; i++) {
            helperArray.push(res.items[i]);
          }
          setMyTopTracks(helperArray);
        })
        .catch((error) => console.log(error.message));

      spotify
        .getMyRecentlyPlayedTracks()
        .then((res) => {
          const helperArray = [];
          var i = 0;
          while (helperArray.length !== 8) {
            if (res.items[i].track.name === res.items[i + 1].track.name) {
              i++;
              continue;
            }
            helperArray.push(res.items[i]);
            i++;
          }
          setMyRecentTracks(helperArray);
        })
        .catch((error) => console.log(error.message));
    }
  }, [ctx.token]);

  return (
    <div className={classes.defaultPage}>
      {ctx.token && (
        <div className={classes.row}>
          {/* <div className={classes.rowTitles}>
          <h1 className={classes.headline}>Spotify Playlists</h1>
          <h3 className={classes.seeall}>SEE ALL</h3>
        </div>
        <div className={classes.rowItems}>
          <PlaylistRow playlist={[]} />
        </div> */}
          <div>
            <div className={classes.rowTitles}>
              <h1 className={classes.headline}>Your Artists</h1>
              <h3 className={classes.seeall}>SEE ALL</h3>
            </div>
            <div className={classes.rowItems}>
              <PlaylistRow playlist={myArtists} type="artists" />
            </div>
          </div>
          <div>
            <div className={classes.rowTitles}>
              <h1 className={classes.headline}>Your Top Tracks</h1>
              <h3 className={classes.seeall}>SEE ALL</h3>
            </div>
            <div className={classes.rowItems}>
              <PlaylistRow playlist={myTopTracks} type="topTracks" />
            </div>
          </div>
          <div>
            <div className={classes.rowTitles}>
              <h1 className={classes.headline}>Recently Played</h1>
              <h3 className={classes.seeall}>SEE ALL</h3>
            </div>
            <div className={classes.rowItems}>
              <PlaylistRow playlist={myRecentTracks} type="recentTracks" />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DefaultPage;
