import classes from './Category.module.css';

export default function Category(props) {
  return (
    <li
      className={classes.categoryBox}
      style={{ backgroundColor: `${props.color}` }}
    >
      <div className={classes.categoryName}>
        <h1 className={classes.name}>{props.name}</h1>
      </div>
      <img
        className={classes.categoryImage}
        src={props.image}
        alt={props.name}
      ></img>
    </li>
  );
}
