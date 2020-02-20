## Spotify Play History

![](screenshot.png?raw=true "Spotify Play History Screenshot")

[Spotify Play History](https://spotify-play-history.now.sh) allows you to see the Spotify songs you recently played on your iPhone or mobile. It's possible to see your song play history in the play queue on the Spotify desktop app, but this feature (as of Feb 2020) is not in Spotify's mobile app. However it is available in Spotify's Web API through this site.

### Uses
* React
* Spotify Implicit Grant Authorization
* Spotify Web API

### Limitations
* User login is valid for only 1 hour before they must login again (limited by Spotify implicit grant auth)
* Can only get 50 recently played songs

### Setup
1. Create an app in the [Spotify Developer Dashboard](https://developer.spotify.com/dashboard/applications)
1. Then in the settings, add `http://localhost:3000` to **Redirect URIs**
1. Copy *Client ID* and paste to `REACT_APP_SPOTIFY_CLIENT_ID` in `.env`
1. `yarn install`
1. `yarn start`

### Deploy
* Add <*Production URL*> to **Redirect URIs** of Spotify Developer app settings
* Create `.env.production` with <*Production URL*> for callback URL
* `now secrets add REACT_APP_SPOTIFY_CLIENT_ID <Client ID>`
* `now secrets add REACT_APP_SPOTIFY_CALLBACK_URL <Production URL>`
* `now --prod`
