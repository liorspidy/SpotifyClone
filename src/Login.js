import classes from './Login.module.css';

var client_id = '683c5b20459c495983696c311fbac615';
var redirect_uri = 'http://localhost:3000';

let generateRandomString = (num) =>
  (Math.random() + 1).toString(36).substring(num);

var state = generateRandomString(16);

// localStorage.setItem(stateKey, state);
var scope =
  'user-read-private user-read-email user-library-modify user-top-read user-read-recently-played user-read-playback-state user-modify-playback-state user-read-currently-playing app-remote-control streaming';

var url = 'https://accounts.spotify.com/authorize';
url += '?response_type=token';
url += '&client_id=' + encodeURIComponent(client_id);
url += '&scope=' + encodeURIComponent(scope);
url += '&redirect_uri=' + encodeURIComponent(redirect_uri);
url += '&state=' + encodeURIComponent(state);
url += '&show_dialog=true';

export const getTokenFromUri = () => {
  return window.location.hash
    .substring(1)
    .split('&')
    .reduce((initial, item) => {
      let parts = item.split('=');
      initial[parts[0]] = decodeURIComponent(parts[1]);
      return initial;
    }, {});
};

const Login = () => {
  return (
    <div className={classes.login}>
      <a href={url}>Log in</a>
    </div>
  );
};

export default Login;
