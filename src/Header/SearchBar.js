import classes from './SearchBar.module.css';
import SearchIcon from '@mui/icons-material/Search';

const SearchBar = (props) => {
  return (
    <div className={classes.searchbar}>
      <SearchIcon className={classes.searchbarIcon} />
      <input type="search" placeholder="What do you want to listen to?" />
    </div>
  );
};
export default SearchBar;
