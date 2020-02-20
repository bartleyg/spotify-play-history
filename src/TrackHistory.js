import React from 'react';
import { format } from 'timeago.js';

import './TrackHistory.css';


// prune the time-ago's so that duplicate strings aren't displayed
function pruneTimeAgoDuplicates(tracks) {
  const times = [];
  let prevTime = null;
  for (let i = 0; i < tracks.length; i += 1) {
    times[i] = format(tracks[i].played_at || Date.now());
    if (i > 0) {
      if (prevTime) {
        if (times[i] === prevTime) {
          times[i] = null;
        } else {
          prevTime = null;
        }
      } else if (times[i] === times[i - 1]) {
        times[i] = null;
        prevTime = times[i - 1];
      }
    }
  }
  return times;
}


function TrackHistory(props) {
  const { tracks } = props;
  const timeAgo = pruneTimeAgoDuplicates(tracks);

  return (
    <div className="track-history-container">
      <div>
        {tracks && tracks.map((track, idx) => (
          <div key={track.played_at || 0}>
            {timeAgo[idx] && <span className="time-ago">{timeAgo[idx]}</span>}
            <a href={track.track.uri}>
              <div className="track">
                <img
                  src={track.track.album.images[2].url}
                  alt={track.track.name}
                />
                <div className="truncate-container">
                  <p className="title truncate">{track.track.name}</p>
                  <p className="artists truncate">
                    {track.track.artists.map((artist) => artist.name).join(', ')}
                  </p>
                </div>
              </div>
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}

export default TrackHistory;
