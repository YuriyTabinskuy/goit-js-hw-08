import Player from '@vimeo/player';
import throttle from 'lodash.throttle';

// key for videoplayer current time
const CURRENT_TIME_KEY = 'videoplayer-current-time';

// select iframe from html
const iframeEl = document.querySelector('#vimeo-player');

// create player
const player = new Player(iframeEl);

// track timeupdate using throttle - once per 1 second
player.on('timeupdate', throttle(onPlay, 1000));

// save video current time to the local storage
function onPlay({ seconds }) {
  localStorage.setItem(CURRENT_TIME_KEY, seconds);
}

// set current time to the videoplayer using local storage saved item
player.setCurrentTime(localStorage.getItem(CURRENT_TIME_KEY));