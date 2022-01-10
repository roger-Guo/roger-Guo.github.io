var myAudioElement = document.getElementById('audio');  

myAudioElement.addEventListener("canplaythrough", event => {
  document.body.addEventListener("click", event => {
    /* 音频可以播放；如果权限允许则播放 */
    myAudioElement.play();
  });
  document.body.click()
});
