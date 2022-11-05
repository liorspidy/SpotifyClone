import classes from './CloneWelcome.module.css';

export default function CloneWelcome() {
  return (
    <div className={classes.welcome}>
      <h1 className={classes.welcomeText}>Welcome to My Spotify Clone</h1>
      <h4>Lior Fridman</h4>
    </div>
  );
}
