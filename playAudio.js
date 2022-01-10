var myAudioElement = document.getElementById('audio');  
var isPlay = false;
myAudioElement.addEventListener("canplaythrough", event => {
  document.body.addEventListener("click", event => {
    if (!isPlay) {
      /* 音频可以播放；如果权限允许则播放 */
      myAudioElement.play();
      isPlay = true;
    }
  });
});
