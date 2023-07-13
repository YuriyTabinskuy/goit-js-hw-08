import Player from '@vimeo/player';
import throttle from 'lodash.throttle';

// key for videoplayer current time
const CURRENT_TIME_KEY = 'videoplayer-current-time';

// select iframe from HTML
const iframeEl = document.querySelector('#vimeo-player');

// create player
const player = new Player(iframeEl);

// track timeupdate using throttle - once per 1 second
player.on('timeupdate', throttle(onPlay, 1000));

// save video current time to local storage
function onPlay({ seconds }) {
  localStorage.setItem(CURRENT_TIME_KEY, seconds);
}

// retrieve current time from local storage
const storedTime = localStorage.getItem(CURRENT_TIME_KEY);

// set current time to the video player using the stored value
if (storedTime !== null) {
  const currentTime = parseFloat(storedTime);
  if (!isNaN(currentTime)) {
    player.setCurrentTime(currentTime);
  }
}
