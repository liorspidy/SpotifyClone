import classes from './Search.module.css';
import Category from './Category';

export default function Search(props) {
  const colorArray = [
    '#E13300',
    '#1E3264',
    '#E8115B',
    '#148A08',
    '#BC5900',
    '#E91429',
    '#E1118C',
    '#8D67AB',
    '#7358FF',
    '#D84000',
    '#E1118C',
    '#E91429',
    '#777777',
    '#8D67AB',
    '#D84000',
    '#DC148C',
    '#148A08',
    '#D84000',
    '#1E3264',
    '#537AA1',
    '#5179A1',
  ];

  const categoriesList = props.categories.map((cat) => {
    return (
      <Category
        key={cat.id}
        id={cat.id}
        name={cat.name}
        image={cat.image}
        color={colorArray.shift()}
      />
    );
  });

  return (
    <div className={classes.searchPage}>
      <h1 className={classes.headline}>Browse all</h1>
      <ul className={classes.searchCategories}>{categoriesList}</ul>
    </div>
  );
}
