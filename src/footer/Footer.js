import classes from './Footer.module.css';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import PictureInPictureAltIcon from '@mui/icons-material/PictureInPictureAlt';
import ShuffleIcon from '@mui/icons-material/Shuffle';
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';
import SkipNextIcon from '@mui/icons-material/SkipNext';
import RepeatIcon from '@mui/icons-material/Repeat';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';
import Volume from './Volume';
import TimingSlider from './TimingSlider';
import { useState, useEffect } from 'react';
import SpotifyWebApi from 'spotify-web-api-js';

const spotify = new SpotifyWebApi();

export default function Footer(props) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [position, setPosition] = useState(0);
  const [currentTrack, setCurrentTrack] = useState({});
  const [volumeValue, setVolumeValue] = useState(100);

  const helperArtists = [];
  currentTrack.item?.artists.forEach((artist) => {
    helperArtists.push(artist.name);
  });

  const artists = helperArtists.join(', ');

  function allLetters(str) {
    let alpha = new Set('abcdefghijklmnopqrstuvwxyz');
    for (let c of alpha) {
      if (str?.toLowerCase().includes(c)) {
        return true;
      }
    }
    return false;
  }

  const classByLang = !allLetters(currentTrack.item?.name)
    ? `${classes.title_heb_name}`
    : `${classes.title_eng_name}`;

  const playButtonHandler = () => {
    setIsPlaying((prevState) => (prevState = !prevState));
    if (currentTrack?.is_playing) {
      spotify
        .pause()
        .then((res) => setCurrentTrack(res))
        .catch((error) => console.log(error.message));
    } else {
      spotify
        .play()
        .then((res) => setCurrentTrack(res))
        .catch((error) => console.log(error.message));
    }
  };

  const skipHandler = () => {
    spotify
      .skipToNext()
      .then()
      .catch((error) => console.log(error.message));
    spotify
      .getMyCurrentPlayingTrack()
      .then((res) => setCurrentTrack(res))
      .catch((error) => console.log(error.message));
  };

  const prevHandler = () => {
    spotify
      .skipToPrevious()
      .then()
      .catch((error) => console.log(error.message));
    spotify
      .getMyCurrentPlayingTrack()
      .then((res) => setCurrentTrack(res))
      .catch((error) => console.log(error.message));
  };

  useEffect(() => {
    setTimeout(() => {
      spotify
        .getMyCurrentPlayingTrack()
        .then((res) => setCurrentTrack(res))
        .catch((error) => console.log(error.message));
      spotify
        .setVolume(volumeValue)
        .catch((error) => console.log(error.message));
    }, 100);

    setPosition(currentTrack.progress_ms);
    setIsPlaying(currentTrack.is_playing);
  }, [currentTrack.progress_ms, currentTrack.is_playing]);

  return (
    <div className={classes.footer}>
      <div className={classes.currentTrackBox}>
        <div className={classes.currentTrack}>
          <img
            className={classes.currentImg}
            src={currentTrack.item?.album.images[1].url}
            alt={currentTrack.item?.album.name}
          />
          <div className={classes.currentTrackDetails}>
            <h1 className={classByLang}>{currentTrack.item?.name}</h1>
            <h5 className={classes.artists}>{artists}</h5>
          </div>
          <div className={classes.currentTrackIcons}>
            <FavoriteBorderIcon className={classes.playerIcon} />
            <PictureInPictureAltIcon className={classes.playerIcon} />
          </div>
        </div>
      </div>
      <div className={classes.footerMainButtons}>
        <div className={classes.footerMainButtonsIcons}>
          <ShuffleIcon className={classes.footerMainButtonsIcon} />
          <SkipPreviousIcon
            className={classes.footerMainButtonsBackForward}
            onClick={prevHandler}
          />
          {!isPlaying && (
            <PlayArrowIcon
              className={classes.PlayButton}
              onClick={playButtonHandler}
            />
          )}
          {isPlaying && (
            <PauseIcon
              className={classes.PlayButton}
              onClick={playButtonHandler}
            />
          )}
          <SkipNextIcon
            className={classes.footerMainButtonsBackForward}
            onClick={skipHandler}
          />
          <RepeatIcon className={classes.footerMainButtonsIcon} />
        </div>
        <div>
          <TimingSlider
            className={classes.footerMainButtonsSlider}
            position={position}
            setPosition={setPosition}
            currentTrack={currentTrack}
          />
        </div>
      </div>
      <Volume setVolumeValue={setVolumeValue} />
    </div>
  );
}
