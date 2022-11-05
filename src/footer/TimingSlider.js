import classes from './TimingSlider.module.css';
import Slider from '@mui/material/Slider';

export default function TimingSlider(props) {
  function millisToMinutesAndSeconds(millis) {
    var minutes = Math.floor(millis / 60000);
    var seconds = Math.floor((millis % 60000) / 1000).toFixed(0);
    return minutes + ':' + (seconds < 10 ? '0' : '') + seconds;
  }

  let initialTiming = millisToMinutesAndSeconds(props.position);
  let finalTiming = millisToMinutesAndSeconds(
    props.currentTrack.item?.duration_ms
  );

  const sliderHandler = (event) => {
    props.setPosition(event.target.value);
  };

  return (
    <div className={classes.timingSlider}>
      <div className={classes.timing}>
        {isNaN(props.position) ? '0:00' : initialTiming}
      </div>
      <Slider
        className={classes.slider}
        aria-label="Volume"
        value={props.position}
        onChange={(event) => sliderHandler(event)}
        step={1}
        max={props.currentTrack.item?.duration_ms}
        size="small"
        color="success"
        sx={{
          color: 'white',
          height: 4,
          '& .MuiSlider-thumb': {
            color: 'transparent',
            boxShadow: 'none',
          },
          '& .MuiSlider-thumb:hover': {
            color: 'white',
          },
          '& .MuiSlider-thumb:active': {
            color: 'white',
          },
          '& .MuiSlider-rail': {
            color: 'white',
          },
          '&:hover, &.Mui-focusVisible, &.Mui-active': {
            boxShadow: 'none',
          },
        }}
      />
      <div className={classes.timing}>
        {isNaN(props.currentTrack.item?.duration_ms) ? '0:00' : finalTiming}
      </div>
    </div>
  );
}
