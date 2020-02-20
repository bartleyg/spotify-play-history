const authEndpoint = 'https://accounts.spotify.com/authorize';
const clientId = process.env.REACT_APP_SPOTIFY_CLIENT_ID;
const redirectUri = process.env.REACT_APP_SPOTIFY_CALLBACK_URL;
const scopes = [
  'user-read-recently-played',
  'user-read-currently-playing',
];

export function getCallbackHashFromURL() {
  const hash = window.location.hash
    .substring(1)
    .split('&')
    .reduce((initial, item) => {
      if (item) {
        const parts = item.split('=');
        initial[parts[0]] = decodeURIComponent(parts[1]);
      }
      return initial;
    }, {});
  if (Object.entries(hash).length !== 0) {
    return {
      token: hash.access_token,
      expires_in: hash.expires_in,
    };
  }
  return null;
}

export function logInSpotify() {
  window.location = `${authEndpoint}?client_id=${clientId}`
                    + `&redirect_uri=${redirectUri}`
                    + `&scope=${scopes.join('%20')}`
                    + '&response_type=token&show_dialog=true';
}
