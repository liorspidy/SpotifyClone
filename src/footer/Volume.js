import MicExternalOnIcon from '@mui/icons-material/MicExternalOn';
import QueueIcon from '@mui/icons-material/Queue';
import DevicesIcon from '@mui/icons-material/Devices';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import OpenInFullIcon from '@mui/icons-material/OpenInFull';
import classes from './Volume.module.css';
import { Slider } from '@mui/material';

export default function Volume(props) {
  let value;

  const handleChange = (event) => {
    props.setVolumeValue(event.target.value);
  };

  return (
    <div className={classes.volume}>
      <MicExternalOnIcon className={classes.playerIcon} />
      <QueueIcon className={classes.playerIcon} />
      <DevicesIcon className={classes.playerIcon} />
      <VolumeUpIcon className={classes.playerIcon} />
      <Slider
        className={classes.slider}
        aria-label="Volume"
        defaultValue={100}
        onChange={handleChange}
        size="small"
        color="success"
        sx={{
          color: 'white',
          width: 100,
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
        }}
      />
      <OpenInFullIcon className={classes.playerIcon} />
    </div>
  );
}
