import React from 'react';
import { withCookies } from 'react-cookie';

import { getCallbackHashFromURL, logInSpotify } from './SpotifyAuth';
import TrackHistory from './TrackHistory';
import placeHolderTracks from './PlaceHolderTracks';

import spotifyLogo from './spotify.png';
import './App.css';

const fetchLimit = 20;


class App extends React.Component {
  constructor(props) {
    super(props);
    const { cookies } = props;
    const token = cookies.get('token');

    this.state = {
      token,
      loggedIn: token ? true : false,
      tracks: [],
      nextPageURL: null,
      fetchLimitReached: false,
    };

    this.loadMoreTracks = this.loadMoreTracks.bind(this);
  }

  componentDidMount() {
    const { cookies } = this.props;
    const hash = getCallbackHashFromURL();

    if (hash) {
      // save a cookie with expiration time of token
      const dateExpires = new Date();
      // convert hash.expires_in (seconds) to time in milliseconds and one second grace
      dateExpires.setTime(dateExpires.getTime() + (hash.expires_in - 1) * 1000);
      cookies.set('token', hash.token, { path: '/', expires: dateExpires });
      this.setState({
        token: hash.token,
        loggedIn: true,
      });
      window.location.hash = '';
    }

    const token = this.state.token || (hash && hash.token);
    if (token) {
      this.fetchRecentlyPlayed(token)
        .then(data => {
          this.setState({
            tracks: data.items,
            nextPageURL: data.next,
            fetchLimitReached: (data.items.length < fetchLimit),
          });
        })
        .catch(console.log);
      this.fetchCurrentlyPlaying(token)
        .then(data => {
          if (data) {
            // format currently-playing like recently-played track and prepend
            const currentTrack = {};
            currentTrack.track = data.item;
            this.setState(prevState => ({
              tracks: [currentTrack, ...prevState.tracks],
            }));
          }
        })
        .catch(console.log);
    }
  }

  fetchRecentlyPlayed(token, next = null) {
    let URL = `https://api.spotify.com/v1/me/player/recently-played?limit=${fetchLimit}`;
    URL = next || URL;
    return fetch(URL, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(response => response.json())
      .then(data => {
        if ('error' in data) {
          console.log(`ERROR: ${data.error.status} ${data.error.message}`);
          this.setState({ loggedIn: false });
        }
        return data;
      })
      .catch(console.log);
  }

  fetchCurrentlyPlaying(token) {
    return fetch('https://api.spotify.com/v1/me/player/currently-playing', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(response => {
        if (response.status === 200) {
          const data = response.json();
          if ('error' in data) {
            console.log(`ERROR: ${data.error.status} ${data.error.message}`);
            this.setState({ loggedIn: false });
          }
          return data;
        }
        return null;
      })
      .catch(console.log);
  }

  loadMoreTracks() {
    this.fetchRecentlyPlayed(this.state.token, this.state.nextPageURL)
      .then(data => {
        this.setState(prevState => ({
          tracks: [...prevState.tracks, ...data.items],
          nextPageURL: data.next,
          fetchLimitReached: (data.items.length < fetchLimit),
        }));
      })
      .catch(console.log);
  }

  render() {
    const { loggedIn, nextPageURL, fetchLimitReached } = this.state;

    return (
      <div className="app">
        <h1>Spotify Play History</h1>
        <img src={spotifyLogo} className="logo" alt="Spotify logo" />
        <div>
          <h2>See the songs Spotify played recently on your phone.</h2>
          {!loggedIn
            && <button onClick={logInSpotify} className="button">Get Play History</button>}
        </div>
        {loggedIn
          ? <TrackHistory tracks={this.state.tracks} />
          : <TrackHistory tracks={placeHolderTracks} />}
        {loggedIn && nextPageURL && !fetchLimitReached
          && <button onClick={this.loadMoreTracks} className="button more">More</button>}
        <p className="footer">
          <a href="https://bartleygillan.com" target="_blank" rel="noopener noreferrer">
            Made with&nbsp;
            <span role="img" aria-label="red heart">❤️</span>
            by Bartley Gillan
          </a>
        </p>
      </div>
    );
  }
}

export default withCookies(App);
