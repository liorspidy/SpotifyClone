import React from 'react';
import classes from './PlaylistRow.module.css';

export default function PlaylistRow(props) {
  let yourPlaylist = [];

  function allLetters(str) {
    let alpha = new Set('abcdefghijklmnopqrstuvwxyz');
    for (let c of alpha) {
      if (str.toLowerCase().includes(c)) {
        return true;
      }
    }
    return false;
  }

  if (props.type === 'artists') {
    yourPlaylist = props.playlist?.map((item) => {
      const classByLang = !allLetters(item.name)
        ? `${classes.heb_name}`
        : `${classes.eng_name}`;
      return (
        <div key={item.id} className={classes.rowItem}>
          <img src={item.images[1].url} alt={item.name} />
          <div className={classes.trackDetail}>
            <h3 className={classByLang}>{item.name}</h3>
          </div>
        </div>
      );
    });
  }

  if (props.type === 'topTracks') {
    yourPlaylist = props.playlist?.map((item) => {
      const classByLang = !allLetters(item.name)
        ? `${classes.heb_name}`
        : `${classes.eng_name}`;

      const trackDuration = Math.round(item.duration_ms / 1000 / 60);
      return (
        <div key={item.id} className={classes.rowItem}>
          <img src={item.album.images[1].url} alt={item.name} />
          <div className={classes.trackDetail}>
            <div className={classByLang}>
              <h3>{item.name}</h3>
            </div>
            <h5 className={classes.duration}>{trackDuration} Min</h5>
          </div>
        </div>
      );
    });
  }

  if (props.type === 'recentTracks') {
    yourPlaylist = props.playlist?.map((item) => {
      const classByLang = !allLetters(item.track.name)
        ? `${classes.heb_name}`
        : `${classes.eng_name}`;

      const classByLangAlbum = !allLetters(item.track.album.name)
        ? `${classes.heb_name_album}`
        : `${classes.eng_name_album}`;

      return (
        <div key={item.track.id} className={classes.rowItem}>
          <img src={item.track.album.images[1].url} alt={item.name} />
          <div className={classes.trackDetail}>
            <h3 className={classByLang}>{item.track.name}</h3>
            <h5 className={classByLangAlbum}>{item.track.album.name}</h5>
          </div>
        </div>
      );
    });
  }

  return <div className={classes.rowItems}>{yourPlaylist}</div>;
}
