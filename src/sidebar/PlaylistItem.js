import { useEffect, useState } from 'react';
import classes from './PlaylistItem.module.css';
// import { useContext } from 'react';
// import DataLayerContext from '../store/DataLayerContext';

const PlaylistItem = (props) => {
  // const ctx = useContext(DataLayerContext);
  const [flag, setFlag] = useState(0);
  //checks for hebrew titles
  function allLetters(str) {
    let alpha = new Set('abcdefghijklmnopqrstuvwxyz');
    for (let c of alpha) {
      if (str.toLowerCase().includes(c)) {
        return true;
      }
    }
    return false;
  }

  useEffect(() => {
    if (!allLetters(props.name)) {
      setFlag(1);
    }
  }, []);

  const classByLang = flag ? `${classes.heb_name}` : `${classes.eng_name}`;

  return (
    <div>
      <h3 className={classByLang}>{props.name}</h3>
    </div>
  );
};

export default PlaylistItem;
