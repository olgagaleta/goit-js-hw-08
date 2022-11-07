import Player from '@vimeo/player';
import throttle from 'lodash.throttle';

const KEY = 'videoplayer-current-time';
const iframe = document.querySelector('iframe');
const player = new Player(iframe);

function handlePlay({ seconds: currentTime }) {
  localStorage.setItem(KEY, JSON.stringify(currentTime));
}

player.on('timeupdate', throttle(handlePlay, 1000));

player
  .setCurrentTime(+localStorage.getItem(KEY))
  .then()
  .catch(function (error) {
    switch (error.name) {
      case 'RangeError':
        console.log('Хай йому грець, не працює!');
        break;

      default:
        console.log('Сталась помилка! От халепа, щось пішло не так...');
        break;
    }
  });
